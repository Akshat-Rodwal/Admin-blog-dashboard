import { createContext, useState, useEffect, useCallback } from 'react';
import { blogService } from '../services/blogService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    sortBy: 'newest',
  });
  const [perPage, setPerPage] = useState(10);

  // Load blogs on mount and run purge for soft-deleted entries
  useEffect(() => {
    (async () => {
      try {
        const data = await blogService.getAll();
        setBlogs(data);
        await blogService.purgeDeleted(); // Auto purge
      } catch (err) {
        setError('Failed to load blogs');
        console.error('Error loading blogs:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Persist blogs whenever they change
  useEffect(() => {
    if (!loading) {
      blogService.saveAll(blogs);
    }
  }, [blogs, loading]);

  // CRUD Operations
  const addBlog = useCallback((newBlog) => {
    setBlogs(prevBlogs => [...prevBlogs, { ...newBlog, id: Date.now().toString(), deleted: false }]);
  }, []);

  const updateBlog = useCallback((id, updatedBlog) => {
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog.id === id ? { ...blog, ...updatedBlog } : blog
      )
    );
  }, []);

  const deleteBlog = useCallback((id) => {
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog.id === id ? { ...blog, deleted: true, deletedAt: Date.now() } : blog
      )
    );
  }, []);

  // Filter and sort blogs
  const getFilteredAndSortedBlogs = useCallback(() => {
    return blogs
      .filter(blog => !blog.deleted) // Skip soft-deleted blogs
      .filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(blog => 
        (filters.category ? blog.category === filters.category : true) &&
        (filters.status ? blog.status === filters.status : true)
      )
      .sort((a, b) => {
        if (filters.sortBy === 'newest') {
          return new Date(b.publishDate) - new Date(a.publishDate);
        } else if (filters.sortBy === 'oldest') {
          return new Date(a.publishDate) - new Date(b.publishDate);
        } else if (filters.sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        } else if (filters.sortBy === 'title-desc') {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [blogs, searchTerm, filters]);

  // Get paginated blogs
  const getPaginatedBlogs = useCallback((items, page = 1, perPageLocal = perPage) => {
    const start = (page - 1) * perPage;
    const end = start + perPageLocal;
    return items.slice(start, end);
  }, [perPage]);

  // Get unique categories for filter dropdown
  const categories = [...new Set(blogs.map(blog => blog.category))];

  const counts = {
    total: blogs.length,
    published: blogs.filter(b => b.status === 'published' && !b.deleted).length,
    draft: blogs.filter(b => b.status === 'draft' && !b.deleted).length,
  };

  return (
    <AppContext.Provider
      value={{
        blogs,
        loading,
        error,
        currentPage,
        setCurrentPage,
        perPage,
        setPerPage,
        searchTerm,
        setSearchTerm,
        filters,
        setFilters,
        categories,
        counts,
        addBlog,
        updateBlog,
        deleteBlog,
        getFilteredAndSortedBlogs,
        getPaginatedBlogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
