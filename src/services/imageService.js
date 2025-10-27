require('dotenv').config();
const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');
const Country = require('../models/Country');

const generateSummaryImage = async () => {
  try {
    console.log('[DEBUG] Starting image generation');
    
    // Get total countries count
    const totalCountries = await Country.count();
    console.log('[DEBUG] Total countries:', totalCountries);
    
    // Get top 5 countries by GDP
    const topCountries = await Country.findAll({
      order: [['estimated_gdp', 'DESC']],
      limit: 5
    });
    console.log('[DEBUG] Top countries found:', topCountries.length);
    
    // Get last refresh timestamp
    const lastRefreshed = await Country.max('last_refreshed_at');
    console.log('[DEBUG] Last refreshed:', lastRefreshed);
    
    // Create canvas
    const width = 800;
    const height = 600;
    console.log('[DEBUG] Creating canvas');
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    console.log('[DEBUG] Canvas created successfully');
    
    // Set background
    ctx.fillStyle = '#f0f8ff';
    ctx.fillRect(0, 0, width, height);
    
    // Set title
    ctx.fillStyle = '#333';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Country Data Summary', width / 2, 50);
    
    // Set total countries
    ctx.font = '20px Arial';
    ctx.fillText(`Total Countries: ${totalCountries}`, width / 2, 100);
    
    // Set last refreshed
    ctx.font = '16px Arial';
    ctx.fillText(`Last Refreshed: ${new Date(lastRefreshed).toLocaleString()}`, width / 2, 130);
    
    // Set top countries title
    ctx.font = 'bold 24px Arial';
    ctx.fillText('Top 5 Countries by Estimated GDP', width / 2, 180);
    
    // Draw top countries
    ctx.font = '18px Arial';
    ctx.textAlign = 'left';
    
    let yPosition = 230;
    for (let i = 0; i < topCountries.length; i++) {
      const country = topCountries[i];
      const gdp = country.estimated_gdp ? 
        `$${country.estimated_gdp.toLocaleString()}` : 'N/A';
      
      ctx.fillText(`${i + 1}. ${country.name}: ${gdp}`, 150, yPosition);
      yPosition += 40;
    }
    
    // Save image
    console.log('[DEBUG] Converting canvas to buffer');
    const buffer = canvas.toBuffer('image/png');
    const imagePath = path.join(__dirname, '../../cache/summary.png');
    console.log('[DEBUG] Image path:', imagePath);
    
    // Ensure cache directory exists
    const cacheDir = path.dirname(imagePath);
    console.log('[DEBUG] Cache directory:', cacheDir);
    if (!fs.existsSync(cacheDir)) {
      console.log('[DEBUG] Creating cache directory');
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    
    console.log('[DEBUG] Writing image file');
    fs.writeFileSync(imagePath, buffer);
    console.log('[DEBUG] Image file written successfully');
    
    return { success: true, message: 'Summary image generated successfully' };
  } catch (error) {
    console.error('[DEBUG] Error generating summary image:', error);
    console.error('[DEBUG] Error stack:', error.stack);
    throw error;
  }
};

module.exports = {
  generateSummaryImage
};
