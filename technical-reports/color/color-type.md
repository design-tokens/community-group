# Color Type

Colors can be represented through various formats. For color, the type property must be set to the string “color”. For the value, the most common format to represent color through design tokens is a hex triplet. A hex triplet is a 6-digit, 24 bit, hexadecimal number that represents Red, Green, and Blue values as #RRGGBB.   

<table>
  <tr>
   <td><strong>Pros</strong>
   </td>
   <td><strong>Cons</strong>
   </td>
  </tr>
  <tr>
   <td>Easily recognized among tools and browsers
<p>
??
   </td>
   <td>Cannot specify alpha value for opacity
   </td>
  </tr>
</table>

For example, initially color tokens may be defined as such:

```
{
  "Majestic magenta": {
    "value": "#ff00ff",
    "type": "color"
  },
  "Simple sage": {
    "value": "#abcabc",
    "type": "color"
  }
}
```

Then, the output from a tool’s conversion to HSL may look something like: 

```
// colors-hex.scss
$majestic-magenta: #ff00ff;
$simple-sage: #abcabc;

// colors-hsl.scss
$majestic-magenta: ​hsl(300, 100%, 50%);
$translucent-shadow: ​hsl(153, 23%, 73%);
```
## Other value options:

### RGBA

Formatted in R (red), G (green), B (blue) and (A) alpha. Red, green, and blue values can range from 0 to 255 and alpha values can range from 0 and 1 (i.e 0.5) or a percentage (i.e 50%) where 1 or %100 is full opacity.

<table>
  <tr>
   <td><strong>Pros</strong>
   </td>
   <td><strong>Cons</strong>
   </td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>Can define alpha value with color</li>
        <li>Alpha value is easy to comprehend at a glance</li>
      </ul>
    </td>
   <td>
    ? 
   </td>
  </tr>
</table>

For example, initially color tokens may be defined as such:

```
{
  "Majestic magenta": {
    "value": {
               "red": 255
               "green": 0
               "blue": 255
               "alpha": 1
             },
    "type": "color"
  },
  "Simple sage": {
    "value": {
               "red": 171
               "green": 202
               "blue": 188
               "alpha": 50%
             },
    "type": "color"
  }
}
```


Then, the output from a tool’s conversion to RGBA may look something like: 


```
// colors-rgba.scss

$majestic-magenta: rgba(255, 0, 255, 1.0);
$translucent-shadow: rgba(171, 202, 188, 50%);
```
### HSL

Formatted in H (hue),  S (saturation), L (lightness) and an optional (A) alpha. Hue values range from 0 to 360, saturation and lightness are percentage values that go from 0% to 100%, and alpha value can range from 0 and 1 (i.e 0.5) or a percentage  (i.e 50%) where 1 or %100 is full opacity (which is the default value if a value isn’t provided).

<table>
  <tr>
   <td><strong>Pros</strong>
   </td>
   <td><strong>Cons</strong>
   </td>
  </tr>
  <tr>
   <td>
<ul>

<li>It is easy to understand compare to other formats

<li>Easy to predict value changes
</li>
</ul>
   </td>
   <td>
<ul>

<li>No supported in older browsers 
</li>
</ul>
   </td>
  </tr>
</table>


Example:


```
{
  "Majestic magenta": {
     "h": 300
     "s": 100%
     "l": 50%
     "a": 100%
    "type": "color"
  },
  "Simple sage": {
     "h": 152
     "s": 22%
     "l": 73%
     "a": 100%
    "type": "color"
  }
}
```

Then, the output variables may look like: 

```
// colors-rgba.scss
$majestic-magenta: hsl(300, 100%, 50%, 1);
$simple-sage: hsl(152, 22%, 73%, 1);
```

### Hex8

Hex8 uses two extra digits, known as the alpha value, to change the transparency of the color. The format follows #RRGGBBAA. [Learn more about alpha values in hex.](https://www.digitalocean.com/community/tutorials/css-hex-code-colors-alpha-values#adding-an-alpha-value-to-css-hex-codes)

<table>
  <tr>
   <td><strong>Pros</strong>
   </td>
   <td><strong>Cons</strong>
   </td>
  </tr>
  <tr>
    <td>
    <ul>
      <li>Can define alpha value with color</li>
    </ul>
   </td>
  <td>
    <ul>
      <li>Less commonly used
      <li>Alpha value is not immediately obvious (needs calculation)
      <li>Not available in older versions of internet explorer (<a href="https://caniuse.com/css-rrggbbaa">caniuse reference</a>) 
      </li>
    </ul>
   </td>
  </tr>
</table>

Example:

```
{
  "Majestic magenta": {
    "value": "#ff00ff80",
    "type": "color"
  },
  "Simple sage": {
    "value": "#abcabc80",
    "type": "color"
  }
}
```

Then, the output variables may look like: 

```
// colors-hex.scss
$majestic-magenta: #ff00ff80;
$simple-sage: #abcabc80;

// colors-rgba.scss
$majestic-magenta: rgba(255, 0, 255, 0.5);
$simple-sage: rgba(171, 202, 188, 0.5);
```
### LCH (Lightness Chroma Hue)

Formatted in L (lightness),  C (chroma), H (hue) and an optional (A) alpha. Hue values range from 0 to 360, saturation and lightness are percentage values that go from 0% to 100%, and alpha value can range from 0 and 1 (i.e 0.5) or a percentage  (i.e 50%) where 1 or %100 is full opacity (which is the default value if a value isn’t provided).

<table>
  <tr>
   <td><strong>Pros</strong>
   </td>
   <td><strong>Cons</strong>
   </td>
  </tr>
  <tr>
   <td>
<ul>

<li>Access to 50% more colors (P3 color space)

<li>Colors more perceptually uniform

<li>
</li>
</ul>
   </td>
   <td>
<ul>

<li>No fully supported (only safari)
</li>
</ul>
   </td>
  </tr>
</table>

---

## Using [Experimental?] Color Spaces

* Using color spaces like OKLCH, OKLAB, CAM16, Display P-3, etc. may result in lack of support from tools, so plan to have a hex back-up