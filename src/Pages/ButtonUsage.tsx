import Button, { BUTTON_VARIANTS, BUTTON_SIZES } from "@/components/Reusable/Button";

import React, { useState, useEffect } from "react";

// Usage Demo Component
export default function ButtonUsageDemo() {
  // State type = an object where keys are strings and values are booleans
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  // Explicitly type buttonId as string
  const handleClick = (buttonId: string) => {
    console.log(`Button ${buttonId} clicked!`);

    // Simulate loading state
    setLoadingStates((prev: Record<string, boolean>) => ({
      ...prev,
      [buttonId]: true,
    }));

    setTimeout(() => {
      setLoadingStates((prev: Record<string, boolean>) => ({
        ...prev,
        [buttonId]: false,
      }));
    }, 2000);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ marginBottom: '40px', color: '#1d1d1f', fontSize: '32px', fontWeight: '600' }}>
        Button Component Usage Examples
      </h1>

      {/* Button Variants */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1d1d1f', fontSize: '24px', fontWeight: '500' }}>
          Button Variants
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            onClick={() => handleClick('primary')}
          >
            Primary Button
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.SECONDARY}
            onClick={() => handleClick('secondary')}
          >
            Secondary Button
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.OUTLINED}
            onClick={() => handleClick('outlined')}
          >
            Outlined Button
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.TEXT}
            onClick={() => handleClick('text')}
          >
            Text Button
          </Button>
        </div>
      </section>

      {/* Custom Colors */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1d1d1f', fontSize: '24px', fontWeight: '500' }}>
          Custom Colors
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            color="#FF3B30"
            onClick={() => handleClick('red-primary')}
          >
            Red Primary
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.OUTLINED}
            color="#34C759"
            onClick={() => handleClick('green-outlined')}
          >
            Green Outlined
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.TEXT}
            color="#FF9500"
            onClick={() => handleClick('orange-text')}
          >
            Orange Text
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            color="#AF52DE"
            onClick={() => handleClick('purple-primary')}
          >
            Purple Primary
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.OUTLINED}
            color="#FF2D92"
            onClick={() => handleClick('pink-outlined')}
          >
            Pink Outlined
          </Button>
        </div>
      </section>

      {/* Button Sizes */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1d1d1f', fontSize: '24px', fontWeight: '500' }}>
          Button Sizes
        </h2>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            size={BUTTON_SIZES.SMALL}
            onClick={() => handleClick('small')}
          >
            Small
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            size={BUTTON_SIZES.MEDIUM}
            onClick={() => handleClick('medium')}
          >
            Medium
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            size={BUTTON_SIZES.LARGE}
            onClick={() => handleClick('large')}
          >
            Large
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            size={BUTTON_SIZES.EXTRA_LARGE}
            onClick={() => handleClick('extra-large')}
          >
            Extra Large
          </Button>
        </div>
      </section>

      {/* Loading States */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1d1d1f', fontSize: '24px', fontWeight: '500' }}>
          Loading States (Click to activate)
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            color="#FF3B30"
            isLoading={loadingStates.loading1}
            onClick={() => handleClick('loading1')}
          >
            Click to Load
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.OUTLINED}
            color="#34C759"
            isLoading={loadingStates.loading2}
            onClick={() => handleClick('loading2')}
          >
            Submit Form
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.SECONDARY}
            isLoading={loadingStates.loading3}
            onClick={() => handleClick('loading3')}
          >
            Save Changes
          </Button>
        </div>
      </section>

      {/* Disabled States */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1d1d1f', fontSize: '24px', fontWeight: '500' }}>
          Disabled States
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            disabled
          >
            Disabled Primary
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.OUTLINED}
            disabled
          >
            Disabled Outlined
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.TEXT}
            disabled
          >
            Disabled Text
          </Button>
        </div>
      </section>

      {/* Full Width Buttons */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1d1d1f', fontSize: '24px', fontWeight: '500' }}>
          Full Width Buttons
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            fullWidth
            onClick={() => handleClick('fullwidth1')}
          >
            Full Width Primary
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.OUTLINED}
            fullWidth
            onClick={() => handleClick('fullwidth2')}
          >
            Full Width Outlined
          </Button>
        </div>
      </section>

      {/* Interactive Example */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#1d1d1f', fontSize: '24px', fontWeight: '500' }}>
          Interactive Examples
        </h2>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Button 
            variant={BUTTON_VARIANTS.PRIMARY}
            onClick={() => alert('Hello from Primary Button!')}
          >
            Show Alert
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.OUTLINED}
            onClick={() => console.log('Logged to console')}
          >
            Log to Console
          </Button>
          <Button 
            variant={BUTTON_VARIANTS.TEXT}
            onClick={() => window.open('https://github.com', '_blank')}
          >
            Open Link
          </Button>
        </div>
      </section>

      {/* Usage Notes */}
      <section style={{ marginTop: '60px', padding: '24px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '16px', color: '#1d1d1f', fontSize: '20px', fontWeight: '500' }}>
          Usage Notes
        </h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', lineHeight: '1.6' }}>
          <li>The button component supports keyboard navigation and screen readers</li>
          <li>Loading states automatically disable the button and show a spinner</li>
          <li>Hover and focus states provide visual feedback</li>
          <li>The component is fully accessible with ARIA attributes</li>
          <li>All variants support all sizes and states</li>
        </ul>
      </section>
    </div>
  );
}