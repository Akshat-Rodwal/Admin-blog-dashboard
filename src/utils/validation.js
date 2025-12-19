export const isValidImageFile = (file) => {
  if (!file) return false;
  const typeOk = /image\/(jpeg|jpg|png)/.test(file.type);
  const sizeOk = file.size <= 1024 * 1024; // 1MB
  return typeOk && sizeOk;
};

export const validateBlogForm = (formData) => {
  const errors = {};
  if (!formData.title?.trim()) errors.title = 'Title is required';
  if (!formData.description?.trim()) errors.description = 'Description is required';
  if (!formData.content?.trim()) errors.content = 'Content is required';
  if (!formData.category) errors.category = 'Please select a category';
  return errors;
};

