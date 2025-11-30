# Batts Table Tennis Supplies Website

A simple, mobile-first website for table tennis equipment sales.

## File Structure

```
batts-table-tennis-supplies/
├── index.html          # Homepage
├── index.css           # Homepage styles
├── rubbers.html        # Rubbers product page
├── rubbers.css         # Rubbers page styles
├── blades.html         # Blades product page
├── blades.css          # Blades page styles
├── all-images/         # Your existing image folder
│   ├── rubber-images/  # Rubber product images
│   ├── blade-images/   # Blade product images
│   └── complete-bats-images/ # Complete bat images
└── README.md           # This file
```

## How to Edit the Website

### Changing Prices
1. Open the HTML file (index.html, rubbers.html, or blades.html)
2. Look for comments like `<!-- To change price: Edit the £ amount below -->`
3. Edit the price in the `<p class="product-price">£XX.XX</p>` tags

### Adding/Changing Images
1. Place your images in the appropriate folder:
   - Hero images: `all-images/`
   - Rubber images: `all-images/rubber-images/`
   - Blade images: `all-images/blade-images/`
   - Complete bat images: `all-images/complete-bats-images/`

2. Update the image paths in HTML files:
   - Look for comments like `<!-- To change product image: Replace "path/to/image.jpg" -->`
   - Update the `src` attribute in the `<img>` tags

### Editing Text Content
1. Look for HTML comments that start with `<!-- To edit...`
2. These comments show you exactly what text to change
3. Edit the text between the HTML tags (e.g., `<h1>Your Text Here</h1>`)

### Changing Colors
1. Open any CSS file (index.css, rubbers.css, or blades.css)
2. Find the `:root` section at the top
3. Edit the color values:
   - `--primary-color`: Main dark color (headers, titles)
   - `--secondary-color`: Blue accent color (buttons, navigation)
   - `--accent-color`: Red color (prices)
   - `--text-color`: Main text color
   - `--light-bg`: Light background color
   - `--border-color`: Border color

### Adding New Products
1. Copy an existing product card from rubbers.html or blades.html
2. Paste it in the products section
3. Update:
   - Product image path
   - Product name
   - Product description  
   - Price
   - "Read More" link

## Mobile Design
- The website is designed mobile-first
- Uses flexbox for responsive layouts
- Automatically adapts to different screen sizes
- No JavaScript required

## Browser Compatibility
- Works in all modern browsers
- Mobile-friendly design
- No external dependencies

## Getting Started
1. Open `index.html` in a web browser to view the website
2. Use the editing instructions above to customize content
3. Replace placeholder images with your actual product photos
4. Update prices and product information as needed

## Image Placeholder Information
The website currently uses placeholder image paths. Replace these with your actual images:
- `hero-placeholder.jpg` - Main homepage hero image
- `rubber-placeholder.jpg` - Category image for rubbers
- `blade-placeholder.jpg` - Category image for blades  
- `bat-placeholder.jpg` - Category image for complete bats
- `rubber1.jpg` through `rubber6.jpg` - Individual rubber product images
- `blade1.jpg` through `blade6.jpg` - Individual blade product images
