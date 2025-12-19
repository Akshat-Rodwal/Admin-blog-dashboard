import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiUpload, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import {
    MdFormatBold,
    MdFormatItalic,
    MdLink,
    MdFormatListBulleted,
    MdImage,
    MdCode,
    MdFormatQuote,
    MdFormatListNumbered,
    MdFormatUnderlined,
    MdTitle,
} from "react-icons/md";
import { useApp } from "../../hooks/useApp";
import Button from "../../components/common/Button";
import Input from "../../components/forms/Input";
import Textarea from "../../components/forms/Textarea";
import Select from "../../components/forms/Select";
import { isValidImageFile, validateBlogForm } from "../../utils/validation";
import { useUnsavedChangesWarning } from "../../hooks/useUnsavedChanges";

const BlogForm = () => {
    const { id } = useParams();
    const isEditMode = !!id;
    const navigate = useNavigate();
    const { blogs, addBlog, updateBlog } = useApp();
    const textareaRef = useRef(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "",
        author: "Admin User",
        status: "draft",
        image: null,
        imagePreview: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useUnsavedChangesWarning(hasUnsavedChanges);

    useEffect(() => {
        if (isEditMode) {
            const blogToEdit = blogs.find((blog) => blog.id === id);
            if (blogToEdit) {
                // Populate form state with existing blog data
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setFormData((prev) => ({
                    ...prev,
                    ...blogToEdit,
                    imagePreview: blogToEdit.image || "",
                }));
            }
        }
    }, [id, isEditMode, blogs]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setHasUnsavedChanges(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!isValidImageFile(file)) {
            setErrors((prev) => ({
                ...prev,
                image: "Only JPG/PNG files up to 1MB are allowed",
            }));
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData((prev) => ({
                ...prev,
                image: file,
                imagePreview: reader.result,
            }));
            setErrors((prev) => ({ ...prev, image: "" }));
        };
        reader.readAsDataURL(file);
        setHasUnsavedChanges(true);
    };

    const removeImage = () => {
        setFormData((prev) => ({
            ...prev,
            image: null,
            imagePreview: "",
        }));
        setHasUnsavedChanges(true);
    };

    const validateForm = () => {
        const newErrors = validateBlogForm(formData);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);

        const blogData = {
            ...formData,
            publishDate: isEditMode
                ? formData.publishDate
                : new Date().toISOString(),
            image: formData.imagePreview,
        };

        setTimeout(() => {
            if (isEditMode) {
                updateBlog(id, blogData);
            } else {
                addBlog(blogData);
            }

            setIsSubmitting(false);
            setHasUnsavedChanges(false);
            navigate("/blogs");
        }, 1000);
    };

    const formatText = (format) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.substring(start, end);
        let newText = "";
        let newCursorPos = 0;

        switch (format) {
            case "bold":
                newText =
                    formData.content.substring(0, start) +
                    `**${selectedText}**` +
                    formData.content.substring(end);
                newCursorPos = end + 4;
                break;
            case "italic":
                newText =
                    formData.content.substring(0, start) +
                    `*${selectedText}*` +
                    formData.content.substring(end);
                newCursorPos = end + 2;
                break;
            case "h2":
                newText =
                    formData.content.substring(0, start) +
                    `## ${selectedText || "Heading"}` +
                    formData.content.substring(end);
                newCursorPos =
                    start + (selectedText ? selectedText.length + 3 : 10);
                break;
            case "link":
                newText =
                    formData.content.substring(0, start) +
                    `[${selectedText || "link text"}](url)` +
                    formData.content.substring(end);
                newCursorPos =
                    start + (selectedText ? selectedText.length + 3 : 11);
                break;
            case "list":
                newText =
                    formData.content.substring(0, start) +
                    `- ${selectedText || "List item"}` +
                    formData.content.substring(end);
                newCursorPos =
                    start + 2 + (selectedText ? selectedText.length : 9);
                break;
            case "numbered":
                newText =
                    formData.content.substring(0, start) +
                    `1. ${selectedText || "List item"}` +
                    formData.content.substring(end);
                newCursorPos =
                    start + 3 + (selectedText ? selectedText.length : 9);
                break;
            case "code":
                if (selectedText.includes("\n")) {
                    newText =
                        formData.content.substring(0, start) +
                        `\n\`\`\`\n${selectedText}\n\`\`\`\n` +
                        formData.content.substring(end);
                    newCursorPos = end + 7;
                } else {
                    newText =
                        formData.content.substring(0, start) +
                        `\`${selectedText || "code"}\`` +
                        formData.content.substring(end);
                    newCursorPos =
                        end + 2 + (selectedText ? selectedText.length : 4);
                }
                break;
            case "quote": {
                const quoteText = selectedText
                    ? selectedText
                          .split("\n")
                          .map((line) => `> ${line}`)
                          .join("\n")
                    : "> Quote text";
                newText =
                    formData.content.substring(0, start) +
                    `\n${quoteText}\n` +
                    formData.content.substring(end);
                newCursorPos = start + quoteText.length + 2;
                break;
            }
            case "image": {
                const altText = selectedText || "alt text";
                newText =
                    formData.content.substring(0, start) +
                    `![${altText}](${formData.imagePreview || "image-url"})` +
                    formData.content.substring(end);
                newCursorPos =
                    start +
                    3 +
                    altText.length +
                    (formData.imagePreview ? formData.imagePreview.length : 9);
                break;
            }
            default:
                return;
        }

        setFormData((prev) => ({
            ...prev,
            content: newText,
        }));

        // Set cursor position after update
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);

        setHasUnsavedChanges(true);
    };

    const handleCancel = () => {
        if (
            hasUnsavedChanges &&
            !window.confirm(
                "You have unsaved changes. Are you sure you want to leave?"
            )
        ) {
            return;
        }
        navigate("/blogs");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
                <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex items-center"
                >
                    <FiArrowLeft className="mr-2 h-4 w-4" />
                    Back to Blog Posts
                </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white dark:bg-[#1e2130] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden rounded-xl transition-colors">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="col-span-full">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                    Featured Image
                                </label>
                                <div className="mt-1 flex items-center">
                                    {formData.imagePreview ? (
                                        <div className="relative">
                                            <img
                                                src={formData.imagePreview}
                                                alt="Preview"
                                                className="h-32 w-full object-cover rounded-lg shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all"
                                            >
                                                <FiX className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-700 border-dashed rounded-lg w-full">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-slate-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-slate-600 dark:text-slate-300">
                                                    <label
                                                        htmlFor="image-upload"
                                                        className="relative cursor-pointer bg-white dark:bg-[#1e2130] rounded-lg font-medium text-primary hover:opacity-90 focus-within:outline-none transition-all"
                                                    >
                                                        <span>
                                                            Upload an image
                                                        </span>
                                                        <input
                                                            id="image-upload"
                                                            name="image-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={
                                                                handleImageChange
                                                            }
                                                            accept="image/jpeg, image/png"
                                                        />
                                                    </label>
                                                    <p className="pl-1">
                                                        or drag and drop
                                                    </p>
                                                </div>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    PNG, JPG up to 1MB
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.image}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-full">
                                <Input
                                    label="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    error={errors.title}
                                    placeholder="Enter blog title"
                                    required
                                />
                            </div>

                            <div className="col-span-full">
                                <Textarea
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    error={errors.description}
                                    placeholder="A short description of your blog post"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="col-span-full">
                                <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">
                                    Content
                                </label>
                                <div className="border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-[#1e2130] transition-colors">
                                    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-slate-200 dark:border-slate-800">
                                        <button
                                            type="button"
                                            onClick={() => formatText("h2")}
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Heading"
                                        >
                                            <MdTitle />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => formatText("bold")}
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Bold (Ctrl+B)"
                                        >
                                            <MdFormatBold />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => formatText("italic")}
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Italic (Ctrl+I)"
                                        >
                                            <MdFormatItalic />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => formatText("link")}
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Link (Ctrl+K)"
                                        >
                                            <MdLink />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => formatText("list")}
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Bullet List"
                                        >
                                            <MdFormatListBulleted />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                formatText("numbered")
                                            }
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Numbered List"
                                        >
                                            <MdFormatListNumbered />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => formatText("image")}
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Insert Image"
                                        >
                                            <MdImage />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => formatText("code")}
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Code Block"
                                        >
                                            <MdCode />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => formatText("quote")}
                                            className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                            title="Quote"
                                        >
                                            <MdFormatQuote />
                                        </button>
                                    </div>
                                    <Textarea
                                        ref={textareaRef}
                                        name="content"
                                        value={formData.content}
                                        onChange={handleChange}
                                        error={errors.content}
                                        placeholder="Write your blog post content here..."
                                        rows={10}
                                        required
                                        className="!mb-0 font-mono text-sm"
                                        onKeyDown={(e) => {
                                            // Add keyboard shortcuts
                                            if (e.ctrlKey || e.metaKey) {
                                                switch (e.key.toLowerCase()) {
                                                    case "b":
                                                        e.preventDefault();
                                                        formatText("bold");
                                                        break;
                                                    case "i":
                                                        e.preventDefault();
                                                        formatText("italic");
                                                        break;
                                                    case "k":
                                                        e.preventDefault();
                                                        formatText("link");
                                                        break;
                                                    default:
                                                        break;
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    label="Category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    options={[
                                        {
                                            value: "",
                                            label: "Select a category",
                                        },
                                        {
                                            value: "Technology",
                                            label: "Technology",
                                        },
                                        {
                                            value: "Business",
                                            label: "Business",
                                        },
                                        {
                                            value: "Lifestyle",
                                            label: "Lifestyle",
                                        },
                                        { value: "Travel", label: "Travel" },
                                        { value: "Food", label: "Food" },
                                    ]}
                                    error={errors.category}
                                    required
                                />

                                <Select
                                    label="Status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    options={[
                                        { value: "draft", label: "Draft" },
                                        {
                                            value: "published",
                                            label: "Published",
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-3 bg-slate-50 dark:bg-[#1f2235] border-t border-slate-200 dark:border-slate-800 text-right sm:px-6 transition-colors">
                        <div className="flex justify-end space-x-3">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={!hasUnsavedChanges || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        {isEditMode
                                            ? "Updating..."
                                            : "Publishing..."}
                                    </>
                                ) : (
                                    <>
                                        <FiSave className="mr-2 h-4 w-4" />
                                        {isEditMode
                                            ? "Update Post"
                                            : "Publish Post"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;
