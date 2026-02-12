/**
 * ═══════════════════════════════════════════════════════════
 * HUMAN SIGNATURE AUDITOR V3.0
 * Detects AI Slop Patterns in Web Interfaces
 * ═══════════════════════════════════════════════════════════
 */

const SlopAuditor = {
  
  /**
   * Main audit function - runs all checks
   */
  check() {
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #d4ff00; font-weight: bold");
    console.log("%c     HUMAN SIGNATURE AUDITOR V3.0", "color: #d4ff00; font-weight: bold; font-size: 16px");
    console.log("%c     Detecting AI Slop Patterns", "color: #d4ff00");
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #d4ff00; font-weight: bold");
    console.log("");
    
    const results = {
      borderRadius: this.checkBorderRadius(),
      symmetry: this.checkSymmetry(),
      typography: this.checkTypography(),
      colors: this.checkColors(),
      spacing: this.checkSpacing(),
      icons: this.checkIcons(),
      gradients: this.checkGradients(),
      animations: this.checkAnimations()
    };
    
    console.log("");
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #d4ff00; font-weight: bold");
    
    const failedChecks = Object.entries(results).filter(([_, passed]) => !passed);
    const totalChecks = Object.keys(results).length;
    const passedChecks = totalChecks - failedChecks.length;
    
    if (failedChecks.length === 0) {
      console.log("%c ✅ PASS: Human fingerprints detected!", "color: #2d7d5e; font-weight: bold; font-size: 16px");
      console.log("%c    All checks passed. This design shows intent.", "color: #2d7d5e");
    } else {
      console.log("%c 🚨 FAIL: AI Slop patterns detected", "color: #d32f2f; font-weight: bold; font-size: 16px");
      console.log(`%c    ${passedChecks}/${totalChecks} checks passed`, "color: #d32f2f");
      console.log("");
      console.log("%c Failed checks:", "color: #d32f2f; font-weight: bold");
      failedChecks.forEach(([check]) => {
        console.log(`%c    ✗ ${check}`, "color: #d32f2f");
      });
    }
    
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #d4ff00; font-weight: bold");
    console.log("");
    
    return {
      passed: failedChecks.length === 0,
      score: `${passedChecks}/${totalChecks}`,
      results
    };
  },
  
  /**
   * Check for generic border-radius (the #1 slop signal)
   */
  checkBorderRadius() {
    console.group("🔍 Border Radius Check");
    
    const allElements = [...document.querySelectorAll('*')];
    const slopRadii = ['12px', '8px', '16px', '20px', '24px']; // Common AI defaults
    const flaggedElements = [];
    
    allElements.forEach(el => {
      const radius = getComputedStyle(el).borderRadius;
      if (slopRadii.includes(radius)) {
        flaggedElements.push({
          element: el,
          radius: radius,
          tag: el.tagName.toLowerCase(),
          classes: el.className
        });
      }
    });
    
    if (flaggedElements.length > 0) {
      console.error(`❌ Found ${flaggedElements.length} elements with generic border-radius`);
      console.table(flaggedElements.slice(0, 10).map(f => ({
        tag: f.tag,
        radius: f.radius,
        classes: f.classes
      })));
      console.log("💡 Recommendation: Use 0px (sharp) or 2px (technical) or 32px+ (bold)");
      console.groupEnd();
      return false;
    } else {
      console.log("✅ No generic border-radius detected");
      console.groupEnd();
      return true;
    }
  },
  
  /**
   * Check for excessive symmetry
   */
  checkSymmetry() {
    console.group("🔍 Symmetry Check");
    
    const issues = [];
    
    // Check for centered body
    const bodyAlign = getComputedStyle(document.body).textAlign;
    if (bodyAlign === 'center') {
      issues.push("Body is text-align: center (excessive centering)");
    }
    
    // Check for symmetrical grids
    const grids = [...document.querySelectorAll('*')].filter(el => 
      getComputedStyle(el).display === 'grid'
    );
    
    grids.forEach(grid => {
      const cols = getComputedStyle(grid).gridTemplateColumns;
      // Check for repeat(3, 1fr) pattern (common slop)
      if (cols.includes('1fr 1fr 1fr') || cols.match(/repeat\(3,\s*1fr\)/)) {
        issues.push(`Found symmetrical 3-column grid: ${grid.tagName.toLowerCase()}.${grid.className}`);
      }
    });
    
    if (issues.length > 0) {
      console.error("❌ Symmetry issues detected:");
      issues.forEach(issue => console.error(`   • ${issue}`));
      console.log("💡 Recommendation: Use asymmetric layouts (1.618fr 1fr, 70/30 splits)");
      console.groupEnd();
      return false;
    } else {
      console.log("✅ Asymmetry and tension present");
      console.groupEnd();
      return true;
    }
  },
  
  /**
   * Check typography hierarchy
   */
  checkTypography() {
    console.group("🔍 Typography Check");
    
    const issues = [];
    
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    const h3 = document.querySelector('h3');
    
    if (h1 && h2) {
      const h1Size = parseFloat(getComputedStyle(h1).fontSize);
      const h2Size = parseFloat(getComputedStyle(h2).fontSize);
      const ratio = h1Size / h2Size;
      
      // Check for weak hierarchy (ratio < 1.5 is too close)
      if (ratio < 1.5) {
        issues.push(`Weak h1/h2 hierarchy: ${ratio.toFixed(2)}x (should be > 1.5x)`);
      }
      
      // Check for mathematical progression (AI default)
      if (Math.abs(ratio - 1.25) < 0.05 || Math.abs(ratio - 1.5) < 0.05) {
        issues.push(`Mathematical scale detected: ${ratio.toFixed(2)}x (too predictable)`);
      }
    }
    
    if (h1) {
      const h1LetterSpacing = getComputedStyle(h1).letterSpacing;
      if (h1LetterSpacing === 'normal' || parseFloat(h1LetterSpacing) >= 0) {
        issues.push("H1 lacks negative letter-spacing (should be -0.02em to -0.05em)");
      }
    }
    
    // Check for generic fonts
    const bodyFont = getComputedStyle(document.body).fontFamily.toLowerCase();
    const genericFonts = ['inter', 'roboto', 'open sans', 'lato'];
    const hasGenericFont = genericFonts.some(font => bodyFont.includes(font));
    
    if (hasGenericFont) {
      issues.push(`Generic font detected: ${bodyFont.split(',')[0]}`);
    }
    
    if (issues.length > 0) {
      console.error("❌ Typography issues detected:");
      issues.forEach(issue => console.error(`   • ${issue}`));
      console.log("💡 Recommendations:");
      console.log("   • Use dramatic scale jumps (2x-4x)");
      console.log("   • Add negative letter-spacing to display text");
      console.log("   • Choose personality typefaces");
      console.groupEnd();
      return false;
    } else {
      console.log("✅ Typography shows intent");
      console.groupEnd();
      return true;
    }
  },
  
  /**
   * Check color usage
   */
  checkColors() {
    console.group("🔍 Color Check");
    
    const issues = [];
    const styles = [...document.styleSheets].flatMap(sheet => {
      try {
        return [...sheet.cssRules];
      } catch {
        return [];
      }
    });
    
    // Check for pure white/black
    const bodyBg = getComputedStyle(document.body).backgroundColor;
    const bodyColor = getComputedStyle(document.body).color;
    
    if (bodyBg === 'rgb(255, 255, 255)' || bodyBg === '#ffffff') {
      issues.push("Pure white background (#fff) - should use warm off-white");
    }
    
    if (bodyColor === 'rgb(0, 0, 0)' || bodyColor === '#000000') {
      issues.push("Pure black text (#000) - should use warm near-black");
    }
    
    // Check for generic gradients
    const gradientElements = [...document.querySelectorAll('*')].filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg.includes('gradient');
    });
    
    if (gradientElements.length > 3) {
      issues.push(`Excessive gradients: ${gradientElements.length} elements (use sparingly)`);
    }
    
    if (issues.length > 0) {
      console.error("❌ Color issues detected:");
      issues.forEach(issue => console.error(`   • ${issue}`));
      console.log("💡 Recommendations:");
      console.log("   • Use 'material' colors: #f9f9f7 (paper), #0d0d0b (ink)");
      console.log("   • Limit accent colors to < 5% of visual area");
      console.groupEnd();
      return false;
    } else {
      console.log("✅ Color system shows restraint");
      console.groupEnd();
      return true;
    }
  },
  
  /**
   * Check spacing patterns
   */
  checkSpacing() {
    console.group("🔍 Spacing Check");
    
    const allElements = [...document.querySelectorAll('*')];
    const paddings = allElements.map(el => getComputedStyle(el).padding);
    
    // Count uniform padding (common slop pattern)
    const uniformPadding = paddings.filter(p => 
      p === '32px' || p === '16px' || p === '24px'
    ).length;
    
    const uniformPercentage = (uniformPadding / allElements.length) * 100;
    
    if (uniformPercentage > 30) {
      console.error(`❌ Excessive uniform spacing: ${uniformPercentage.toFixed(1)}% of elements`);
      console.log("💡 Recommendation: Use varied spacing to encode meaning");
      console.log("   • Tight: 0.5rem for related elements");
      console.log("   • Violent: 6rem+ for major breaks");
      console.groupEnd();
      return false;
    } else {
      console.log("✅ Spacing shows rhythm and intent");
      console.groupEnd();
      return true;
    }
  },
  
  /**
   * Check for generic icon libraries
   */
  checkIcons() {
    console.group("🔍 Icon Check");
    
    const svgs = [...document.querySelectorAll('svg')];
    const issues = [];
    
    // Check for generic icon libraries
    const genericClasses = ['heroicon', 'lucide', 'feather', 'bootstrap-icon'];
    const genericIcons = svgs.filter(svg => 
      genericClasses.some(cls => svg.className.baseVal?.includes(cls))
    );
    
    if (genericIcons.length > 0) {
      issues.push(`Found ${genericIcons.length} generic library icons (modify them!)`);
    }
    
    // Check stroke widths
    const standardStrokes = svgs.filter(svg => {
      const stroke = svg.getAttribute('stroke-width');
      return stroke === '2' || stroke === '1.5';
    });
    
    if (standardStrokes.length > 5) {
      issues.push(`${standardStrokes.length} icons use standard stroke-width (try 1.73, 2.15)`);
    }
    
    // Check total icon count
    if (svgs.length > 15) {
      issues.push(`Too many icons: ${svgs.length} (max should be ~12)`);
    }
    
    if (issues.length > 0) {
      console.error("❌ Icon issues detected:");
      issues.forEach(issue => console.error(`   • ${issue}`));
      console.log("💡 Recommendations:");
      console.log("   • Modify generic icons with custom stroke-width");
      console.log("   • Replace icons with text where clearer: [ MENU ]");
      console.log("   • Limit to 12 unique icons");
      console.groupEnd();
      return false;
    } else {
      console.log("✅ Icon usage shows restraint");
      console.groupEnd();
      return true;
    }
  },
  
  /**
   * Check gradients
   */
  checkGradients() {
    console.group("🔍 Gradient Check");
    
    const elements = [...document.querySelectorAll('*')];
    const gradients = [];
    
    elements.forEach(el => {
      const bg = getComputedStyle(el).backgroundImage;
      if (bg.includes('gradient')) {
        // Extract gradient direction
        const match = bg.match(/(\d+)deg/) || bg.match(/(to\s+\w+)/);
        const direction = match ? match[1] : 'unknown';
        gradients.push({ element: el, direction, background: bg });
      }
    });
    
    // Check for AI default angles
    const defaultAngles = ['45deg', '90deg', '135deg', '180deg'];
    const genericGradients = gradients.filter(g => 
      defaultAngles.some(angle => g.direction === angle)
    );
    
    if (genericGradients.length > 0) {
      console.error(`❌ Found ${genericGradients.length} gradients with AI default angles`);
      console.error("   Common AI angles:", defaultAngles.join(', '));
      console.log("💡 Recommendation: Use intentional angles (160deg, 215deg, etc.)");
      console.groupEnd();
      return false;
    } else if (gradients.length > 0) {
      console.log(`✅ ${gradients.length} gradients detected with intentional angles`);
      console.groupEnd();
      return true;
    } else {
      console.log("✅ No gradients (restraint appreciated)");
      console.groupEnd();
      return true;
    }
  },
  
  /**
   * Check animations
   */
  checkAnimations() {
    console.group("🔍 Animation Check");
    
    const allElements = [...document.querySelectorAll('*')];
    const issues = [];
    
    // Check for default easing
    const defaultEasing = allElements.filter(el => {
      const transition = getComputedStyle(el).transition;
      return transition.includes('ease') && 
             !transition.includes('cubic-bezier') &&
             transition !== 'all 0s ease 0s'; // Ignore no-transition
    });
    
    if (defaultEasing.length > 5) {
      issues.push(`${defaultEasing.length} elements use default 'ease' (use cubic-bezier)`);
    }
    
    // Check for ambient animations
    const animated = [...document.querySelectorAll('[style*="animation"]')];
    if (animated.length > 3) {
      issues.push(`${animated.length} animated elements (avoid ambient motion)`);
    }
    
    if (issues.length > 0) {
      console.error("❌ Animation issues detected:");
      issues.forEach(issue => console.error(`   • ${issue}`));
      console.log("💡 Recommendations:");
      console.log("   • Use cubic-bezier(0.34, 1.56, 0.64, 1) for spring effect");
      console.log("   • Avoid looping/ambient animations");
      console.groupEnd();
      return false;
    } else {
      console.log("✅ Animations show physics and intent");
      console.groupEnd();
      return true;
    }
  },
  
  /**
   * Generate detailed report
   */
  generateReport() {
    const result = this.check();
    
    console.log("");
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #d4ff00; font-weight: bold");
    console.log("%c     DETAILED RECOMMENDATIONS", "color: #d4ff00; font-weight: bold; font-size: 14px");
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #d4ff00; font-weight: bold");
    console.log("");
    console.log("Next steps to improve human signature:");
    console.log("");
    console.log("1. Layout & Structure:");
    console.log("   • Replace symmetrical grids with asymmetric ratios (1.618:1)");
    console.log("   • Add overlapping elements (margin-top: -10%)");
    console.log("   • Break container boundaries selectively");
    console.log("");
    console.log("2. Typography:");
    console.log("   • Increase h1 to 'abusive' scale (8vw-15vw)");
    console.log("   • Add negative letter-spacing to display text");
    console.log("   • Create violent hierarchy (4x jumps, not 1.2x)");
    console.log("");
    console.log("3. Color & Materials:");
    console.log("   • Replace #fff with #f9f9f7 (paper)");
    console.log("   • Replace #000 with #0d0d0b (ink)");
    console.log("   • Add one 'acid' accent color sparingly");
    console.log("");
    console.log("4. Components:");
    console.log("   • Remove all 12px border-radius");
    console.log("   • Add physical recoil to button hovers");
    console.log("   • Make forms feel technical, not soft");
    console.log("");
    console.log("5. Interactions:");
    console.log("   • Replace 'ease' with cubic-bezier spring effects");
    console.log("   • Remove ambient/looping animations");
    console.log("   • Add weight to interactions (transform + scale)");
    console.log("");
    console.log("%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "color: #d4ff00; font-weight: bold");
    
    return result;
  },
  
  /**
   * Quick check with minimal output
   */
  quickCheck() {
    const result = this.check();
    return result.passed ? "✅ PASS" : "🚨 FAIL";
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SlopAuditor;
}

// Auto-run if desired
// SlopAuditor.check();

// Make available globally
window.SlopAuditor = SlopAuditor;

console.log("%c💡 TIP: Run SlopAuditor.check() to audit this page", "color: #d4ff00; font-size: 12px");
console.log("%c💡 TIP: Run SlopAuditor.generateReport() for detailed recommendations", "color: #d4ff00; font-size: 12px");
