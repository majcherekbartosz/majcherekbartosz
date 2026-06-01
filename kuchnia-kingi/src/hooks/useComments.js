import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const LOCAL_KEY = 'kuchnia-kingi-comments';

function loadLocal(recipeId) {
  try {
    const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    return all[recipeId] || [];
  } catch { return []; }
}

function saveLocal(recipeId, comments) {
  try {
    const all = JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
    all[recipeId] = comments;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(all));
  } catch { /* ignore */ }
}

export function useComments(recipeId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recipeId) return;

    let cancelled = false;

    if (!isSupabaseConfigured()) {
      Promise.resolve().then(() => {
        if (cancelled) return;
        setComments(loadLocal(recipeId));
        setLoading(false);
      });
      return () => { cancelled = true; };
    }

    supabase
      .from('comments')
      .select('*')
      .eq('recipe_id', recipeId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error('Comments fetch error:', error.message);
          setComments(loadLocal(recipeId));
        } else {
          setComments(data);
        }
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [recipeId]);

  const addComment = async (authorName, content) => {
    const newComment = {
      id: crypto.randomUUID(),
      recipe_id: recipeId,
      author_name: authorName,
      content,
      created_at: new Date().toISOString(),
    };

    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('comments').insert(newComment);
      if (error) {
        console.error('Comment insert error:', error.message);
        return { error };
      }
    }

    setComments((prev) => [newComment, ...prev]);

    if (!isSupabaseConfigured()) {
      saveLocal(recipeId, [newComment, ...comments]);
    }

    return { error: null };
  };

  const deleteComment = async (commentId) => {
    if (isSupabaseConfigured()) {
      const { error } = await supabase.from('comments').delete().eq('id', commentId);
      if (error) {
        console.error('Comment delete error:', error.message);
        return { error };
      }
    }

    const updated = comments.filter((c) => c.id !== commentId);
    setComments(updated);

    if (!isSupabaseConfigured()) {
      saveLocal(recipeId, updated);
    }

    return { error: null };
  };

  return { comments, loading, addComment, deleteComment };
}
