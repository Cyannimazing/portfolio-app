# Projects Page Setup Guide

Your Projects page is ready! Here's how to add your actual projects:

## 📁 Folder Structure

```
portfolio-app/
├── public/
│   ├── projects/          ← Add your project images here
│   │   ├── project1.jpg
│   │   ├── project1-1.jpg (screenshot 1)
│   │   ├── project1-2.jpg (screenshot 2)
│   │   └── ...
│   └── reports/           ← Add your PDF reports here (optional)
│       ├── project1-doc.pdf
│       └── ...
```

## 📝 Adding Your Projects

Edit `app/projects/page.tsx` and update the `projects` array (around line 24):

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Your Project Name",
    description: "Short description for carousel",
    mainImage: "/projects/your-project.jpg",
    technologies: ["Next.js", "Laravel", "MySQL"],
    fullDescription: "Detailed description that appears in modal",
    features: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
    ],
    subImages: [
      { url: "/projects/your-project-1.jpg", caption: "Dashboard" },
      { url: "/projects/your-project-2.jpg", caption: "Admin Panel" },
    ],
    pdfReports: [  // Optional
      { name: "Documentation.pdf", url: "/reports/doc.pdf" },
    ],
    liveLink: "https://your-live-site.com",  // Optional
    githubLink: "https://github.com/yourusername/project",  // Optional
  },
  // Add more projects...
];
```

## 🖼️ Image Guidelines

### Main Images (Carousel)
- **Size**: 1200x800px recommended
- **Format**: JPG or PNG
- **Name**: `project1.jpg`, `project2.jpg`, etc.

### Screenshots (Modal)
- **Size**: 800x600px recommended
- **Format**: JPG or PNG
- **Name**: `project1-1.jpg`, `project1-2.jpg`, etc.

## 📄 PDF Reports (Optional)

If your projects have documentation or reports:
1. Save PDF files to `/public/reports/`
2. Add to project object:
```typescript
pdfReports: [
  { name: "Project Report.pdf", url: "/reports/project-report.pdf" },
],
```

## 🎨 Features Included

✅ **Animated carousel** with left/right navigation
✅ **Dot indicators** for quick navigation
✅ **Detailed modal** with full project info
✅ **Screenshots gallery** in modal
✅ **PDF reports section** (optional)
✅ **Live site & GitHub links** (optional)
✅ **Smooth animations** throughout
✅ **Fully responsive** design
✅ **Consistent dark theme** with sky-blue accents

## 🚀 Testing

1. Add at least 2-3 sample images to `/public/projects/`
2. Update the projects array with your data
3. Uncomment the Image components in the code (lines 121-127 and modal)
4. Test the carousel navigation
5. Click "View Details" to test the modal

## 💡 Tips

- Start with 2-3 of your best projects
- Use high-quality screenshots
- Write clear, concise descriptions
- Add real technologies you used
- Include GitHub links for open-source projects
- PDF reports are optional but add credibility

Need help? Check the sample project data in the code for reference!
