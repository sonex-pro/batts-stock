# Universal Modal System Setup Guide

## 🎯 Quick Setup for Each Page Type

### 1. **Rubber Pages** (rubbers.html)
```html
<script src="../scripts/universal-modal.js"></script>
<script>
    initializeModal('rubber');
</script>
```

### 2. **Bat Pages** (bats.html) ✅ DONE
```html
<script src="../scripts/universal-modal.js"></script>
<script>
    initializeModal('bat');
</script>
```

### 3. **Blade Pages** (blades.html)
```html
<script src="../scripts/universal-modal.js"></script>
<script>
    initializeModal('blade');
</script>
```

### 4. **Accessory Pages** (accessories.html)
```html
<script src="../scripts/universal-modal.js"></script>
<script>
    initializeModal('accessory');
</script>
```

---

## 📝 How to Add New Products

### Step 1: Add Product Description
Open `/scripts/universal-modal.js` and find the appropriate section:

```javascript
// For RUBBERS - Add to rubberDescriptions
'Your Rubber Name': {
    title: 'DISPLAY TITLE',
    content: `Your detailed description here...`
}

// For BATS - Add to batDescriptions  
'Your Bat Name': {
    title: 'DISPLAY TITLE',
    content: `Your detailed description here...`
}
```

### Step 2: Add Product Specifications
```javascript
// For RUBBERS - Add to rubberSpecs
'Your Rubber Name': {
    speed: '120', 
    spin: '115', 
    control: '85', 
    strategy: 'OFF', 
    hardness: '45°'
}

// For BATS - Add to batSpecs
'Your Bat Name': {
    rubbers: 'Rubber 1<br>Rubber 2',
    strategy: 'Offensive',
    plys: '5',
    handle: 'Flare'
}
```

### Step 3: Add Colors & Thickness (if needed)
```javascript
// In getProductColors()
'Your Product Name': 'Red, Black',

// In getProductThickness() 
'Your Product Name': '2.0mm, Max',
```

---

## 🔧 Product Type Specifications

### **Rubbers** 🏓
- Speed (0-150)
- Spin (0-150) 
- Control (0-150)
- Strategy (OFF+, OFF, ALL-ROUND, DEF)
- Hardness (°)

### **Bats** 🏏
- Rubbers (HTML allowed for line breaks)
- Strategy (Offensive, All-Round, Defensive)
- Plys (number of wood layers)
- Handle (Flare, Straight, Anatomic)

### **Blades** 🪵
- Plys (number of layers)
- Weight (grams)
- Speed (Slow, Medium, Fast, Very Fast)
- Control (Low, Medium, High, Very High)

### **Accessories** 🎒
- Type (Case, Cleaner, Glue, etc.)
- Material (Nylon, Leather, etc.)
- Size (Standard, Large, etc.)

---

## 🚀 Migration Steps

### Replace Old Modal System:
1. **Remove** old modal.js references
2. **Add** universal-modal.js reference  
3. **Replace** custom modal HTML with comment
4. **Add** initializeModal() call

### Example Migration:
```html
<!-- OLD -->
<script src="../scripts/modal.js"></script>
<div id="modal-overlay">...</div>

<!-- NEW -->
<script src="../scripts/universal-modal.js"></script>
<!-- Modal created automatically -->
<script>initializeModal('rubber');</script>
```

---

## 💡 Tips for Easy Updates

1. **Product Names Must Match Exactly** - The name in your HTML must match the name in the JavaScript data
2. **Use HTML in Descriptions** - You can use `<br>`, `<p>`, etc. in product descriptions
3. **Test Each Product** - Click through each product to ensure data displays correctly
4. **Consistent Naming** - Use the same product names across all data sections

---

## 🐛 Troubleshooting

**Modal not opening?**
- Check console for JavaScript errors
- Ensure product name matches exactly in all data sections

**Wrong specifications showing?**
- Verify you're calling initializeModal() with correct product type
- Check that product name exists in the specs section

**Styling issues?**
- Ensure modal.css is still included
- Universal modal uses same CSS classes as original

---

## 📞 Need Help?

The universal modal system is designed to be simple to update. Just follow the patterns in the existing code and add your products to the appropriate sections!
