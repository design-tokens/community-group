# Introduction

Expressing alternate values for design tokens multiples the number of values to manage for every layer. This specification describes an efficient way to work with [=alternate values=]while producing the fewest minimal end number. We’ll compare a [naïve approach](#naive-approach) to the [resolver approach](#resolver-approach) outlined in this document.

## Naïve approach

The naïve approach multiplies the number of final values flatly with the number of alternate value layers. Mathematically, this can be expresed as the original starting number of tokens 𝑇, multiplied by layers of alternate values 𝐴𝑉, produces a final number of tokens 𝑇<sub>𝛥</sub>:

<math display="block">
  <mrow>
    <mi>T</mi>
    <mo>×</mo>
    <mi>AV</mi>
    <mo>=</mo>
    <msub><mi>T</mi><mi>Δ</mi></msub>
  </mrow>
</math>

<aside class="example" title="Naïve token increase">

Starting with 100 [color tokens](../format/#color):

- Adding a 2nd “dark mode” layer of alternate values results in 200 values, or 100 × 2.
- Adding a 2nd (“dark mode”), 3rd (“light mode - high contrast”), and 4th (“dark mode - high contrast”) layer results in 400 values, or 100 × 4.

</aside>

## Resolver approach

The resolver approach involves breaking apart all tokens 𝑇 into subsets 𝑡<sub>1</sub>, 𝑡<sub>2</sub>, … 𝑡<sub>𝑛</sub>, and applying alternate value layers separately to produce a subtotal. The subtotals are added together to produce a final 𝑇<sub>𝛥</sub> value. The key difference is avoiding flat multiplication across the entire superset by breaking into subsets. Mathematically this may be expressed like so:

<math display="block">
  <mtable>
    <mtr>
      <mtd>
        <msub><mi>𝑡</mi><mn>1</mn></msub>
        <mo>×</mo>
        <msub><mi>AV</mi><mn>1</mn></msub>
      </mtd>
      <mtd>
        <mo>=</mo>
      </mtd>
      <mtd>
        <msub><mi>T</mi><mn>Δ1</mn></msub>
      </mtd>
    </mtr>
    <mtr>
      <mtd>
        <msub><mi>𝑡</mi><mn>2</mn></msub>
        <mo>×</mo>
        <msub><mi>AV</mi><mn>2</mn></msub>
      </mtd>
      <mtd>
        <mo>=</mo>
      </mtd>
      <mtd>
        <msub><mi>T</mi><mn>Δ2</mn></msub>
      </mtd>
    </mtr>
    <mtr>
      <mtd></mtd><mtd>...</mtd><mtd></mtd>
    </mtr>
    <mtr>
      <mtd>
        <msub><mi>𝑡</mi><mi>n</mi></msub>
        <mo>×</mo>
        <msub><mi>AV</mi><mi>n</mi></msub>
      </mtd>
      <mtd>
        <mo>=</mo>
      </mtd>
      <mtd>
        <msub>
          <mi>T</mi>
          <mi>Δn</mi>
        </msub>
      </mtd>
    </mtr>
    <mtr>
      <mtd>
        <msub><mi>T</mi><mn>Δ1</mn></msub>
        <mo>+</mo>
        <msub><mi>T</mi><mn>Δ2</mn></msub>
        <mo>+</mo>
        <mi>…</mi>
        <msub><mi>T</mi><mi>Δn</mi></msub>
      </mtd>
      <mtd><mo>=</mo></mtd>
      <mtd><msub><mi>T</mi><mi>Δ</mi></msub></mtd>
    </mtr>
  </mtable>
</math>

<aside class="example" title="Resolver approach">

1. Subset 𝑎, consisting of 100 color tokens, applies 4 alternate value layers (100 × 4).
2. Subset 𝑏, consisting of 50 dimension tokens, applies 4 alternate value layers (50 × 4).
3. Subset 𝑐, consisting of 50 typography tokens, applies 2 alternate value layers (50 × 2).
4. Adding all subtotals together (400 + 200 + 100) produces 700 final values.

700 is much fewer than the 2,000 tokens you’d get from the naïve method (100 × (4 + 4 + 2))!

</aside>

This illustrates the concept in abstract. See [syntax](#syntax) to see how it’s expressed in JSON.
