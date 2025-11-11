// The MIT License (MIT)

// Copyright (c) 2018 GitHub Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// JSON.stringify() stores these in memory as strings, but declaring them as
// objects prevents simple typos and errors
export default {
  'primer.resolver.json': JSON.stringify({
    name: 'GitHub Primer',
    description: 'GitHub’s official design system',
    version: '2025.10',
    resolutionOrder: [
      { $ref: '#/sets/base' },
      { $ref: '#/sets/functional' },
      { $ref: '#/modifiers/theme' },
      { $ref: '#/modifiers/size' },
    ],
    sets: {
      base: {
        sources: [
          { $ref: 'base/motion/easing.tokens.json' },
          { $ref: 'base/motion/timing.tokens.json' },
          { $ref: 'base/size/size.tokens.json' },
          { $ref: 'base/typography/typography.tokens.json' },
          { $ref: 'base/color/light/light.tokens.json' },
          { $ref: 'base/color/light/display-light.tokens.json' },
        ],
      },
      functional: {
        sources: [
          { $ref: 'functional/border/border.tokens.json' },
          { $ref: 'functional/color/bgColor.tokens.json' },
          { $ref: 'functional/color/borderColor.tokens.json' },
          { $ref: 'functional/color/control.tokens.json' },
          { $ref: 'functional/color/data-vis.tokens.json' },
          { $ref: 'functional/color/display.tokens.json' },
          { $ref: 'functional/color/fgColor.tokens.json' },
          { $ref: 'functional/color/focus.tokens.json' },
          { $ref: 'functional/color/selection.tokens.json' },
          { $ref: 'functional/color/syntax.tokens.json' },
          { $ref: 'functional/shadow/shadow.tokens.json' },
          { $ref: 'functional/size/size.tokens.json' },
          { $ref: 'functional/size/viewport.tokens.json' },
          { $ref: 'functional/typography/typography.tokens.json' },
        ],
      },
    },
    modifiers: {
      theme: {
        contexts: {
          light: [],
          'light-hc': [
            { $ref: 'base/color/light/light.high-contrast.tokens.json' },
            {
              $ref: 'functional/color/control.light-high-contrast.tokens.json',
            },
            {
              $ref: 'functional/color/fgColor.light-high-contrast.tokens.json',
            },
          ],
          dark: [
            { $ref: 'base/color/dark/dark.tokens.json' },
            { $ref: 'base/color/dark/display-dark.tokens.json' },
            { $ref: 'functional/color/fgColor.dark.tokens.json' },
            { $ref: 'functional/color/control.dark.tokens.json' },
          ],
          'dark-dimmed': [
            { $ref: 'base/color/dark/dark.dimmed.tokens.json' },
            { $ref: 'functional/color/control.dark-dimmed.tokens.json' },
            { $ref: 'functional/color/fgColor.dark-dimmed.tokens.json' },
          ],
          'dark-hc': [
            { $ref: 'base/color/dark/dark.high-contrast.tokens.json' },
            {
              $ref: 'functional/color/control.dark-high-contrast.tokens.json',
            },
            {
              $ref: 'functional/color/fgColor.dark-high-contrast.tokens.json',
            },
          ],
        },
      },
      size: {
        contexts: {
          default: [],
          coarse: [{ $ref: 'functional/size/size-coarse.tokens.json' }],
          fine: [{ $ref: 'functional/size/size-fine.tokens.json' }],
        },
      },
    },
  }),
  'base/color/dark/dark.tokens.json': JSON.stringify({
    base: {
      color: {
        $type: 'color',
        black: { $value: '#010409' },
        inset: { $value: '{base.color.black}' },
        white: { $value: '#ffffff' },
        transparent: { $value: '#000000', alpha: 0 },
        neutral: {
          '0': { $value: '{base.color.black}' },
          '1': { $value: '#0D1117' },
          '2': { $value: '#151B23' },
          '3': { $value: '#212830' },
          '4': { $value: '#262C36' },
          '5': { $value: '#2A313C' },
          '6': { $value: '#2F3742' },
          '7': { $value: '#3D444D' },
          '8': { $value: '#656C76' },
          '9': { $value: '#9198A1' },
          '10': { $value: '#B7BDC8' },
          '11': { $value: '#D1D7E0' },
          '12': { $value: '#F0F6FC' },
          '13': { $value: '{base.color.white}' },
        },
        blue: {
          '0': { $value: '#cae8ff' },
          '1': { $value: '#a5d6ff' },
          '2': { $value: '#79c0ff' },
          '3': { $value: '#58a6ff' },
          '4': { $value: '#388bfd' },
          '5': { $value: '#1f6feb' },
          '6': { $value: '#1158c7' },
          '7': { $value: '#0d419d' },
          '8': { $value: '#0c2d6b' },
          '9': { $value: '#051d4d' },
        },
        green: {
          '0': { $value: '#aff5b4' },
          '1': { $value: '#7ee787' },
          '2': { $value: '#56d364' },
          '3': { $value: '#3fb950' },
          '4': { $value: '#2ea043' },
          '5': { $value: '#238636' },
          '6': { $value: '#196c2e' },
          '7': { $value: '#0f5323' },
          '8': { $value: '#033a16' },
          '9': { $value: '#04260f' },
        },
        yellow: {
          '0': { $value: '#f8e3a1' },
          '1': { $value: '#f2cc60' },
          '2': { $value: '#e3b341' },
          '3': { $value: '#d29922' },
          '4': { $value: '#bb8009' },
          '5': { $value: '#9e6a03' },
          '6': { $value: '#845306' },
          '7': { $value: '#693e00' },
          '8': { $value: '#4b2900' },
          '9': { $value: '#341a00' },
        },
        orange: {
          '0': { $value: '#ffdfb6' },
          '1': { $value: '#ffc680' },
          '2': { $value: '#ffa657' },
          '3': { $value: '#f0883e' },
          '4': { $value: '#db6d28' },
          '5': { $value: '#bd561d' },
          '6': { $value: '#9b4215' },
          '7': { $value: '#762d0a' },
          '8': { $value: '#5a1e02' },
          '9': { $value: '#3d1300' },
        },
        red: {
          '0': { $value: '#ffdcd7' },
          '1': { $value: '#ffc1ba' },
          '2': { $value: '#ffa198' },
          '3': { $value: '#ff7b72' },
          '4': { $value: '#f85149' },
          '5': { $value: '#da3633' },
          '6': { $value: '#b62324' },
          '7': { $value: '#8e1519' },
          '8': { $value: '#67060c' },
          '9': { $value: '#490202' },
        },
        purple: {
          '0': { $value: '#eddeff' },
          '1': { $value: '#e2c5ff' },
          '2': { $value: '#d2a8ff' },
          '3': { $value: '#BE8FFF' },
          '4': { $value: '#AB7DF8' },
          '5': { $value: '#8957e5' },
          '6': { $value: '#6e40c9' },
          '7': { $value: '#553098' },
          '8': { $value: '#3c1e70' },
          '9': { $value: '#271052' },
        },
        pink: {
          '0': { $value: '#ffdaec' },
          '1': { $value: '#ffbedd' },
          '2': { $value: '#ff9bce' },
          '3': { $value: '#f778ba' },
          '4': { $value: '#db61a2' },
          '5': { $value: '#bf4b8a' },
          '6': { $value: '#9e3670' },
          '7': { $value: '#7d2457' },
          '8': { $value: '#5e103e' },
          '9': { $value: '#42062a' },
        },
        coral: {
          '0': { $value: '#ffddd2' },
          '1': { $value: '#ffc2b2' },
          '2': { $value: '#ffa28b' },
          '3': { $value: '#f78166' },
          '4': { $value: '#ea6045' },
          '5': { $value: '#cf462d' },
          '6': { $value: '#ac3220' },
          '7': { $value: '#872012' },
          '8': { $value: '#640d04' },
          '9': { $value: '#460701' },
        },
      },
    },
  }),
  'base/color/dark/dark.dimmed.tokens.json': JSON.stringify({
    base: {
      color: {
        $type: 'color',
        black: { $value: '#1c2128' },
        white: { $value: '#cdd9e5' },
        blue: {
          '0': { $value: '#c6e6ff' },
          '1': { $value: '#96d0ff' },
          '2': { $value: '#6cb6ff' },
          '3': { $value: '#539bf5' },
          '4': { $value: '#4184e4' },
          '5': { $value: '#316dca' },
          '6': { $value: '#255ab2' },
          '7': { $value: '#1b4b91' },
          '8': { $value: '#143d79' },
          '9': { $value: '#0f2d5c' },
        },
        green: {
          '0': { $value: '#b4f1b4' },
          '1': { $value: '#8ddb8c' },
          '2': { $value: '#6bc46d' },
          '3': { $value: '#57ab5a' },
          '4': { $value: '#46954a' },
          '5': { $value: '#347d39' },
          '6': { $value: '#2b6a30' },
          '7': { $value: '#245829' },
          '8': { $value: '#1b4721' },
          '9': { $value: '#113417' },
        },
        yellow: {
          '0': { $value: '#fbe090' },
          '1': { $value: '#eac55f' },
          '2': { $value: '#daaa3f' },
          '3': { $value: '#c69026' },
          '4': { $value: '#ae7c14' },
          '5': { $value: '#966600' },
          '6': { $value: '#805400' },
          '7': { $value: '#6c4400' },
          '8': { $value: '#593600' },
          '9': { $value: '#452700' },
        },
        orange: {
          '0': { $value: '#ffddb0' },
          '1': { $value: '#ffbc6f' },
          '2': { $value: '#f69d50' },
          '3': { $value: '#e0823d' },
          '4': { $value: '#cc6b2c' },
          '5': { $value: '#ae5622' },
          '6': { $value: '#94471b' },
          '7': { $value: '#7f3913' },
          '8': { $value: '#682d0f' },
          '9': { $value: '#4d210c' },
        },
        red: {
          '0': { $value: '#ffd8d3' },
          '1': { $value: '#ffb8b0' },
          '2': { $value: '#ff938a' },
          '3': { $value: '#f47067' },
          '4': { $value: '#e5534b' },
          '5': { $value: '#c93c37' },
          '6': { $value: '#ad2e2c' },
          '7': { $value: '#922323' },
          '8': { $value: '#78191b' },
          '9': { $value: '#5d0f12' },
        },
        purple: {
          '0': { $value: '#eedcff' },
          '1': { $value: '#dcbdfb' },
          '2': { $value: '#dcbdfb' },
          '3': { $value: '#b083f0' },
          '4': { $value: '#986ee2' },
          '5': { $value: '#8256d0' },
          '6': { $value: '#6b44bc' },
          '7': { $value: '#5936a2' },
          '8': { $value: '#472c82' },
          '9': { $value: '#352160' },
        },
        pink: {
          '0': { $value: '#ffd7eb' },
          '1': { $value: '#ffb3d8' },
          '2': { $value: '#fc8dc7' },
          '3': { $value: '#e275ad' },
          '4': { $value: '#c96198' },
          '5': { $value: '#ae4c82' },
          '6': { $value: '#983b6e' },
          '7': { $value: '#7e325a' },
          '8': { $value: '#69264a' },
          '9': { $value: '#551639' },
        },
        coral: {
          '0': { $value: '#ffdacf' },
          '1': { $value: '#ffb9a5' },
          '2': { $value: '#f79981' },
          '3': { $value: '#ec775c' },
          '4': { $value: '#de5b41' },
          '5': { $value: '#c2442d' },
          '6': { $value: '#a93524' },
          '7': { $value: '#8d291b' },
          '8': { $value: '#771d13' },
          '9': { $value: '#5d1008' },
        },
      },
    },
  }),
  'base/color/dark/dark.high-contrast.tokens.json': JSON.stringify({
    base: {
      color: {
        $type: 'color',
        black: { $value: '#010409' },
        blue: {
          '0': { $value: '#caeaff' },
          '1': { $value: '#addcff' },
          '2': { $value: '#91cbff' },
          '3': { $value: '#71b7ff' },
          '4': { $value: '#5CACFF' },
          '5': { $value: '#409eff' },
          '6': { $value: '#318bf8' },
          '7': { $value: '#2672f3' },
          '8': { $value: '#1e60d5' },
          '9': { $value: '#194fb1' },
        },
        green: {
          '0': { $value: '#acf7b6' },
          '1': { $value: '#72f088' },
          '2': { $value: '#4ae168' },
          '3': { $value: '#28D751' },
          '4': { $value: '#0AC740' },
          '5': { $value: '#09b43a' },
          '6': { $value: '#02a232' },
          '7': { $value: '#008c2c' },
          '8': { $value: '#007728' },
          '9': { $value: '#006222' },
        },
        yellow: {
          '0': { $value: '#fbe59e' },
          '1': { $value: '#fbd669' },
          '2': { $value: '#f7c843' },
          '3': { $value: '#f0b72f' },
          '4': { $value: '#EDAA27' },
          '5': { $value: '#e09b13' },
          '6': { $value: '#c88508' },
          '7': { $value: '#ae7104' },
          '8': { $value: '#945d02' },
          '9': { $value: '#7b4900' },
        },
        orange: {
          '0': { $value: '#ffe1b4' },
          '1': { $value: '#ffcf86' },
          '2': { $value: '#ffb757' },
          '3': { $value: '#fe9a2d' },
          '4': { $value: '#F48B25' },
          '5': { $value: '#e7811d' },
          '6': { $value: '#d57014' },
          '7': { $value: '#bf5e0a' },
          '8': { $value: '#a74c00' },
          '9': { $value: '#8f3c00' },
        },
        red: {
          '0': { $value: '#ffdedb' },
          '1': { $value: '#ffc9c7' },
          '2': { $value: '#ffb1af' },
          '3': { $value: '#ff9492' },
          '4': { $value: '#FF8080' },
          '5': { $value: '#ff6a69' },
          '6': { $value: '#ff4445' },
          '7': { $value: '#e82a2f' },
          '8': { $value: '#cc1421' },
          '9': { $value: '#ad0116' },
        },
        purple: {
          '0': { $value: '#f0dfff' },
          '1': { $value: '#e6ccff' },
          '2': { $value: '#dbb7ff' },
          '3': { $value: '#cb9eff' },
          '4': { $value: '#BF8FFF' },
          '5': { $value: '#b87fff' },
          '6': { $value: '#a66bff' },
          '7': { $value: '#954ffd' },
          '8': { $value: '#8031f7' },
          '9': { $value: '#6921d7' },
        },
        pink: {
          '0': { $value: '#ffdceb' },
          '1': { $value: '#ffc7e1' },
          '2': { $value: '#ffadd4' },
          '3': { $value: '#ff8dc7' },
          '4': { $value: '#F87CBD' },
          '5': { $value: '#ef6eb1' },
          '6': { $value: '#e456a3' },
          '7': { $value: '#d23d91' },
          '8': { $value: '#b72c7d' },
          '9': { $value: '#9c1d6a' },
        },
        coral: {
          '0': {
            $value: '#ffded4',
          },
          '1': { $value: '#ffcbb9' },
          '2': { $value: '#ffb39b' },
          '3': { $value: '#ff967d' },
          '4': { $value: '#FD8468' },
          '5': { $value: '#fc704f' },
          '6': { $value: '#f75133' },
          '7': { $value: '#e03b21' },
          '8': { $value: '#c62612' },
          '9': { $value: '#a91500' },
        },
      },
    },
  }),
  'base/color/dark/display-dark.tokens.json': JSON.stringify({
    base: {
      display: {
        color: {
          $type: 'color',
          gray: {
            '0': { $value: '#1c1c1c' },
            '1': { $value: '#2a2b2d' },
            '2': { $value: '#393d41' },
            '3': { $value: '#474e57' },
            '4': { $value: '#576270' },
            '5': { $value: '#6e7f96' },
            '6': { $value: '#92a1b5' },
            '7': { $value: '#9babbf' },
            '8': { $value: '#b3c0d1' },
            '9': { $value: '#c4cfde' },
          },
          red: {
            '0': { $value: '#3c0614' },
            '1': { $value: '#58091a' },
            '2': { $value: '#790c20' },
            '3': { $value: '#990f24' },
            '4': { $value: '#c31328' },
            '5': { $value: '#eb3342' },
            '6': { $value: '#f27d83' },
            '7': { $value: '#f48b8d' },
            '8': { $value: '#f7adab' },
            '9': { $value: '#f9c1be' },
          },
          coral: {
            '0': { $value: '#351008' },
            '1': { $value: '#51180b' },
            '2': { $value: '#72220d' },
            '3': { $value: '#902a0e' },
            '4': { $value: '#b3350f' },
            '5': { $value: '#e1430e' },
            '6': { $value: '#f7794b' },
            '7': { $value: '#fa8c61' },
            '8': { $value: '#fdaa86' },
            '9': { $value: '#ffc0a3' },
          },
          orange: {
            '0': { $value: '#311708' },
            '1': { $value: '#43200a' },
            '2': { $value: '#632f0d' },
            '3': { $value: '#7b3c0e' },
            '4': { $value: '#984b10' },
            '5': { $value: '#c46212' },
            '6': { $value: '#ed8326' },
            '7': { $value: '#f1933b' },
            '8': { $value: '#f6b06a' },
            '9': { $value: '#fac68f' },
          },
          yellow: {
            '0': { $value: '#2e1a00' },
            '1': { $value: '#3d2401' },
            '2': { $value: '#5a3702' },
            '3': { $value: '#6d4403' },
            '4': { $value: '#895906' },
            '5': { $value: '#aa7109' },
            '6': { $value: '#d3910d' },
            '7': { $value: '#df9e11' },
            '8': { $value: '#edb431' },
            '9': { $value: '#f0ca6a' },
          },
          lemon: {
            '0': { $value: '#291d00' },
            '1': { $value: '#372901' },
            '2': { $value: '#4f3c02' },
            '3': { $value: '#614c05' },
            '4': { $value: '#786008' },
            '5': { $value: '#977b0c' },
            '6': { $value: '#ba9b12' },
            '7': { $value: '#c4a717' },
            '8': { $value: '#d7bc1d' },
            '9': { $value: '#e3d04f' },
          },
          olive: {
            '0': { $value: '#171e0b' },
            '1': { $value: '#252d10' },
            '2': { $value: '#374115' },
            '3': { $value: '#485219' },
            '4': { $value: '#5e681d' },
            '5': { $value: '#7a8321' },
            '6': { $value: '#a2a626' },
            '7': { $value: '#b2af24' },
            '8': { $value: '#cbc025' },
            '9': { $value: '#e2d04b' },
          },
          lime: {
            '0': { $value: '#141f0f' },
            '1': { $value: '#1f3116' },
            '2': { $value: '#2c441d' },
            '3': { $value: '#375421' },
            '4': { $value: '#496c28' },
            '5': { $value: '#5f892f' },
            '6': { $value: '#7dae37' },
            '7': { $value: '#89ba36' },
            '8': { $value: '#9fcc3e' },
            '9': { $value: '#bcda67' },
          },
          green: {
            '0': { $value: '#122117' },
            '1': { $value: '#182f1f' },
            '2': { $value: '#214529' },
            '3': { $value: '#285830' },
            '4': { $value: '#2f6f37' },
            '5': { $value: '#388f3f' },
            '6': { $value: '#41b445' },
            '7': { $value: '#46c144' },
            '8': { $value: '#75d36f' },
            '9': { $value: '#99e090' },
          },
          pine: {
            '0': { $value: '#082119' },
            '1': { $value: '#0b3224' },
            '2': { $value: '#0e4430' },
            '3': { $value: '#115a3e' },
            '4': { $value: '#14714c' },
            '5': { $value: '#18915e' },
            '6': { $value: '#1bb673' },
            '7': { $value: '#1ac176' },
            '8': { $value: '#1bda81' },
            '9': { $value: '#3eea97' },
          },
          teal: {
            '0': { $value: '#041f25' },
            '1': { $value: '#073036' },
            '2': { $value: '#0a464d' },
            '3': { $value: '#0c555a' },
            '4': { $value: '#106c70' },
            '5': { $value: '#158a8a' },
            '6': { $value: '#1cb0ab' },
            '7': { $value: '#1fbdb2' },
            '8': { $value: '#24d6c4' },
            '9': { $value: '#5fe3d1' },
          },
          cyan: {
            '0': { $value: '#001f29' },
            '1': { $value: '#002e3d' },
            '2': { $value: '#014156' },
            '3': { $value: '#02536f' },
            '4': { $value: '#036a8c' },
            '5': { $value: '#0587b3' },
            '6': { $value: '#07ace4' },
            '7': { $value: '#09b7f1' },
            '8': { $value: '#45cbf7' },
            '9': { $value: '#80dbf9' },
          },
          blue: {
            '0': { $value: '#001a47' },
            '1': { $value: '#002766' },
            '2': { $value: '#00378a' },
            '3': { $value: '#0046a8' },
            '4': { $value: '#005bd1' },
            '5': { $value: '#0576ff' },
            '6': { $value: '#4da0ff' },
            '7': { $value: '#61adff' },
            '8': { $value: '#85c2ff' },
            '9': { $value: '#a3d3ff' },
          },
          indigo: {
            '0': { $value: '#1b183f' },
            '1': { $value: '#25215f' },
            '2': { $value: '#312c90' },
            '3': { $value: '#3935c0' },
            '4': { $value: '#514ed4' },
            '5': { $value: '#7070e1' },
            '6': { $value: '#9899ec' },
            '7': { $value: '#a2a5f1' },
            '8': { $value: '#b7baf6' },
            '9': { $value: '#c8cbf9' },
          },
          purple: {
            '0': { $value: '#211047' },
            '1': { $value: '#31146b' },
            '2': { $value: '#481a9e' },
            '3': { $value: '#5b1cca' },
            '4': { $value: '#7730e8' },
            '5': { $value: '#975bf1' },
            '6': { $value: '#b687f7' },
            '7': { $value: '#c398fb' },
            '8': { $value: '#d2affd' },
            '9': { $value: '#e1c7ff' },
          },
          plum: {
            '0': { $value: '#2a0e3f' },
            '1': { $value: '#40125e' },
            '2': { $value: '#5c1688' },
            '3': { $value: '#7517ab' },
            '4': { $value: '#9518d8' },
            '5': { $value: '#b643ef' },
            '6': { $value: '#d07ef7' },
            '7': { $value: '#d889fa' },
            '8': { $value: '#e4a5fd' },
            '9': { $value: '#edbdff' },
          },
          pink: {
            '0': { $value: '#2d1524' },
            '1': { $value: '#451c35' },
            '2': { $value: '#65244a' },
            '3': { $value: '#842a5d' },
            '4': { $value: '#ac2f74' },
            '5': { $value: '#d34591' },
            '6': { $value: '#e57bb2' },
            '7': { $value: '#ec8dbd' },
            '8': { $value: '#f4a9cd' },
            '9': { $value: '#f9bed9' },
          },
          auburn: {
            '0': { $value: '#271817' },
            '1': { $value: '#3a2422' },
            '2': { $value: '#543331' },
            '3': { $value: '#6d4340' },
            '4': { $value: '#87534f' },
            '5': { $value: '#a86f6b' },
            '6': { $value: '#bf9592' },
            '7': { $value: '#c6a19f' },
            '8': { $value: '#d4b7b5' },
            '9': { $value: '#dfcac8' },
          },
          brown: {
            '0': { $value: '#241c14' },
            '1': { $value: '#342a1d' },
            '2': { $value: '#483a28' },
            '3': { $value: '#5d4a32' },
            '4': { $value: '#755e3e' },
            '5': { $value: '#94774c' },
            '6': { $value: '#b69a6d' },
            '7': { $value: '#bfa77d' },
            '8': { $value: '#cdbb98' },
            '9': { $value: '#dbceb3' },
          },
          black: { $value: '#0d1117' },
          white: { $value: '#ffffff' },
        },
      },
    },
  }),
  'base/color/light/display-light.tokens.json': JSON.stringify({
    base: {
      display: {
        color: {
          $type: 'color',
          gray: {
            '0': { $value: '#e8ecf2' },
            '1': { $value: '#d2dae4' },
            '2': { $value: '#b4c0cf' },
            '3': { $value: '#9ba9bb' },
            '4': { $value: '#808fa3' },
            '5': { $value: '#647182' },
            '6': { $value: '#5c6570' },
            '7': { $value: '#4e535a' },
            '8': { $value: '#424448' },
            '9': { $value: '#303031' },
          },
          auburn: {
            '0': { $value: '#f2e9e9' },
            '1': { $value: '#e6d6d5' },
            '2': { $value: '#d4b7b5' },
            '3': { $value: '#c59e9b' },
            '4': { $value: '#b4827e' },
            '5': { $value: '#9d615c' },
            '6': { $value: '#8a5551' },
            '7': { $value: '#744744' },
            '8': { $value: '#5d3937' },
            '9': { $value: '#432928' },
          },
          brown: {
            '0': { $value: '#eeeae2' },
            '1': { $value: '#dfd7c8' },
            '2': { $value: '#cbbda4' },
            '3': { $value: '#b8a484' },
            '4': { $value: '#a68b64' },
            '5': { $value: '#856d4c' },
            '6': { $value: '#755f43' },
            '7': { $value: '#64513a' },
            '8': { $value: '#51412f' },
            '9': { $value: '#3a2e22' },
          },
          orange: {
            '0': { $value: '#ffe7d1' },
            '1': { $value: '#fecfaa' },
            '2': { $value: '#fbaf74' },
            '3': { $value: '#f68c41' },
            '4': { $value: '#eb670f' },
            '5': { $value: '#b8500f' },
            '6': { $value: '#a24610' },
            '7': { $value: '#8d3c11' },
            '8': { $value: '#70300f' },
            '9': { $value: '#54230d' },
          },
          yellow: {
            '0': { $value: '#ffec9e' },
            '1': { $value: '#ffd642' },
            '2': { $value: '#ebb400' },
            '3': { $value: '#d19d00' },
            '4': { $value: '#b88700' },
            '5': { $value: '#946a00' },
            '6': { $value: '#805900' },
            '7': { $value: '#704d00' },
            '8': { $value: '#5c3d00' },
            '9': { $value: '#422b00' },
          },
          lemon: {
            '0': { $value: '#f7eea1' },
            '1': { $value: '#f0db3d' },
            '2': { $value: '#d8bd0e' },
            '3': { $value: '#c2a60a' },
            '4': { $value: '#a68c07' },
            '5': { $value: '#866e04' },
            '6': { $value: '#786002' },
            '7': { $value: '#654f01' },
            '8': { $value: '#523f00' },
            '9': { $value: '#3d2e00' },
          },
          olive: {
            '0': { $value: '#f0f0ad' },
            '1': { $value: '#dbe170' },
            '2': { $value: '#b9c832' },
            '3': { $value: '#9bae32' },
            '4': { $value: '#819532' },
            '5': { $value: '#64762d' },
            '6': { $value: '#56682c' },
            '7': { $value: '#495a2b' },
            '8': { $value: '#3b4927' },
            '9': { $value: '#2a331f' },
          },
          lime: {
            '0': { $value: '#e3f2b5' },
            '1': { $value: '#c7e580' },
            '2': { $value: '#9bd039' },
            '3': { $value: '#80b530' },
            '4': { $value: '#6c9d2f' },
            '5': { $value: '#527a29' },
            '6': { $value: '#476c28' },
            '7': { $value: '#3a5b25' },
            '8': { $value: '#2f4a21' },
            '9': { $value: '#213319' },
          },
          green: {
            '0': { $value: '#caf7ca' },
            '1': { $value: '#9ceda0' },
            '2': { $value: '#54d961' },
            '3': { $value: '#31bf46' },
            '4': { $value: '#30a147' },
            '5': { $value: '#2c8141' },
            '6': { $value: '#2b6e3f' },
            '7': { $value: '#285c3b' },
            '8': { $value: '#254b34' },
            '9': { $value: '#1d3528' },
          },
          pine: {
            '0': { $value: '#bff8db' },
            '1': { $value: '#80efb9' },
            '2': { $value: '#1dd781' },
            '3': { $value: '#1dbf76' },
            '4': { $value: '#1aa267' },
            '5': { $value: '#167e53' },
            '6': { $value: '#156f4b' },
            '7': { $value: '#135d41' },
            '8': { $value: '#114b36' },
            '9': { $value: '#0d3627' },
          },
          teal: {
            '0': { $value: '#c7f5ef' },
            '1': { $value: '#89ebe1' },
            '2': { $value: '#22d3c7' },
            '3': { $value: '#1db9b4' },
            '4': { $value: '#179b9b' },
            '5': { $value: '#127e81' },
            '6': { $value: '#106e75' },
            '7': { $value: '#0d5b63' },
            '8': { $value: '#0a4852' },
            '9': { $value: '#073740' },
          },
          cyan: {
            '0': { $value: '#bdf4ff' },
            '1': { $value: '#7ae9ff' },
            '2': { $value: '#00d0fa' },
            '3': { $value: '#00b7db' },
            '4': { $value: '#0099b8' },
            '5': { $value: '#007b94' },
            '6': { $value: '#006a80' },
            '7': { $value: '#00596b' },
            '8': { $value: '#004857' },
            '9': { $value: '#003742' },
          },
          blue: {
            '0': { $value: '#d1f0ff' },
            '1': { $value: '#ade1ff' },
            '2': { $value: '#75c8ff' },
            '3': { $value: '#47afff' },
            '4': { $value: '#0f8fff' },
            '5': { $value: '#006edb' },
            '6': { $value: '#005fcc' },
            '7': { $value: '#004db3' },
            '8': { $value: '#003d99' },
            '9': { $value: '#002b75' },
          },
          indigo: {
            '0': { $value: '#e5e9ff' },
            '1': { $value: '#d2d7fe' },
            '2': { $value: '#b1b9fb' },
            '3': { $value: '#979ff7' },
            '4': { $value: '#7a82f0' },
            '5': { $value: '#5a61e7' },
            '6': { $value: '#494edf' },
            '7': { $value: '#393cd5' },
            '8': { $value: '#2d2db4' },
            '9': { $value: '#25247b' },
          },
          purple: {
            '0': { $value: '#f1e5ff' },
            '1': { $value: '#e6d2fe' },
            '2': { $value: '#d1b1fc' },
            '3': { $value: '#bc91f8' },
            '4': { $value: '#a672f3' },
            '5': { $value: '#894ceb' },
            '6': { $value: '#783ae4' },
            '7': { $value: '#6223d7' },
            '8': { $value: '#4f21ab' },
            '9': { $value: '#391b79' },
          },
          plum: {
            '0': { $value: '#f8e5ff' },
            '1': { $value: '#f0cdfe' },
            '2': { $value: '#e2a7fb' },
            '3': { $value: '#d487f7' },
            '4': { $value: '#c264f2' },
            '5': { $value: '#a830e8' },
            '6': { $value: '#961edc' },
            '7': { $value: '#7d1eb8' },
            '8': { $value: '#651d96' },
            '9': { $value: '#471769' },
          },
          pink: {
            '0': { $value: '#ffe5f1' },
            '1': { $value: '#fdc9e2' },
            '2': { $value: '#f8a5cf' },
            '3': { $value: '#f184bc' },
            '4': { $value: '#e55da5' },
            '5': { $value: '#ce2c85' },
            '6': { $value: '#b12f79' },
            '7': { $value: '#8e2e66' },
            '8': { $value: '#6e2b53' },
            '9': { $value: '#4d233d' },
          },
          red: {
            '0': { $value: '#ffe2e0' },
            '1': { $value: '#fecdcd' },
            '2': { $value: '#fda5a7' },
            '3': { $value: '#fb8389' },
            '4': { $value: '#f85461' },
            '5': { $value: '#df0c24' },
            '6': { $value: '#c50d28' },
            '7': { $value: '#a60c29' },
            '8': { $value: '#880c27' },
            '9': { $value: '#610a20' },
          },
          coral: {
            '0': { $value: '#ffe5db' },
            '1': { $value: '#fecebe' },
            '2': { $value: '#fcab92' },
            '3': { $value: '#f88768' },
            '4': { $value: '#f25f3a' },
            '5': { $value: '#d43511' },
            '6': { $value: '#ba2e12' },
            '7': { $value: '#9b2712' },
            '8': { $value: '#7e2011' },
            '9': { $value: '#5d180e' },
          },
          black: { $value: '#0d1117' },
          white: { $value: '#ffffff' },
        },
      },
    },
  }),
  'base/color/light/light.high-contrast.tokens.json': JSON.stringify({
    base: {
      color: {
        $type: 'color',
        black: { $value: '#010409' },
        blue: {
          '0': { $value: '#dff7ff' },
          '1': { $value: '#9cd7ff' },
          '2': { $value: '#67b3fd' },
          '3': { $value: '#368cf9' },
          '4': { $value: '#1168e3' },
          '5': { $value: '#0349b4' },
          '6': { $value: '#023b95' },
          '7': { $value: '#022f7a' },
          '8': { $value: '#032563' },
          '9': { $value: '#021a4a' },
        },
        green: {
          '0': { $value: '#d2fedb' },
          '1': { $value: '#82e596' },
          '2': { $value: '#43c663' },
          '3': { $value: '#26a148' },
          '4': { $value: '#117f32' },
          '5': { $value: '#055d20' },
          '6': { $value: '#024c1a' },
          '7': { $value: '#013d14' },
          '8': { $value: '#003110' },
          '9': { $value: '#00230b' },
        },
        yellow: {
          '0': { $value: '#fcf7be' },
          '1': { $value: '#f0ce53' },
          '2': { $value: '#d5a824' },
          '3': { $value: '#b58407' },
          '4': { $value: '#956400' },
          '5': { $value: '#744500' },
          '6': { $value: '#603700' },
          '7': { $value: '#4e2c00' },
          '8': { $value: '#3f2200' },
          '9': { $value: '#2e1800' },
        },
        orange: {
          '0': { $value: '#fff2d5' },
          '1': { $value: '#ffc67b' },
          '2': { $value: '#f99636' },
          '3': { $value: '#dc6d1a' },
          '4': { $value: '#b45105' },
          '5': { $value: '#873800' },
          '6': { $value: '#702c00' },
          '7': { $value: '#5b2300' },
          '8': { $value: '#491b00' },
          '9': { $value: '#361200' },
        },
        red: {
          '0': { $value: '#fff0ee' },
          '1': { $value: '#ffc1bc' },
          '2': { $value: '#ff8e8a' },
          '3': { $value: '#ee5a5d' },
          '4': { $value: '#d5232c' },
          '5': { $value: '#a0111f' },
          '6': { $value: '#86061d' },
          '7': { $value: '#6e011a' },
          '8': { $value: '#5a0016' },
          '9': { $value: '#430011' },
        },
        purple: {
          '0': { $value: '#faf0fe' },
          '1': { $value: '#e0c5ff' },
          '2': { $value: '#c49bff' },
          '3': { $value: '#a371f7' },
          '4': { $value: '#844ae7' },
          '5': { $value: '#622cbc' },
          '6': { $value: '#512598' },
          '7': { $value: '#411d7b' },
          '8': { $value: '#341763' },
          '9': { $value: '#260f49' },
        },
        pink: {
          '0': { $value: '#feeff7' },
          '1': { $value: '#ffbde0' },
          '2': { $value: '#fc87ca' },
          '3': { $value: '#ed4baf' },
          '4': { $value: '#c9248e' },
          '5': { $value: '#971368' },
          '6': { $value: '#7d0c57' },
          '7': { $value: '#660847' },
          '8': { $value: '#53043a' },
          '9': { $value: '#3e022b' },
        },
        coral: {
          '0': { $value: '#fff0ed' },
          '1': { $value: '#ffc2b6' },
          '2': { $value: '#ff8f7e' },
          '4': { $value: '#ef5b48' },
          '3': { $value: '#cd3425' },
          '5': { $value: '#9f1710' },
          '6': { $value: '#870706' },
          '7': { $value: '#6f0107' },
          '8': { $value: '#5b0002' },
          '9': { $value: '#430200' },
        },
      },
    },
  }),
  'base/color/light/light.tokens.json': JSON.stringify({
    base: {
      color: {
        $type: 'color',
        black: { $value: '#1f2328' },
        inset: { $value: '{base.color.neutral.0}' },
        transparent: { $value: '#ffffff', alpha: 0 },
        white: { $value: '#ffffff' },
        neutral: {
          '0': { $value: '{base.color.white}' },
          '1': { $value: '#F6F8FA' },
          '2': { $value: '#EFF2F5' },
          '3': { $value: '#E6EAEF' },
          '4': { $value: '#E0E6EB' },
          '5': { $value: '#DAE0E7' },
          '6': { $value: '#D1D9E0' },
          '7': { $value: '#C8D1DA' },
          '8': { $value: '#818B98' },
          '9': { $value: '#59636E' },
          '10': { $value: '#454C54' },
          '11': { $value: '#393F46' },
          '12': { $value: '#25292E' },
          '13': { $value: '{base.color.black}' },
        },
        blue: {
          '0': { $value: '#ddf4ff' },
          '1': { $value: '#b6e3ff' },
          '2': { $value: '#80ccff' },
          '3': { $value: '#54aeff' },
          '4': { $value: '#218bff' },
          '5': { $value: '#0969da' },
          '6': { $value: '#0550ae' },
          '7': { $value: '#033d8b' },
          '8': { $value: '#0a3069' },
          '9': { $value: '#002155' },
        },
        green: {
          '0': { $value: '#dafbe1' },
          '1': { $value: '#aceebb' },
          '2': { $value: '#6fdd8b' },
          '3': { $value: '#4ac26b' },
          '4': { $value: '#2da44e' },
          '5': { $value: '#1a7f37' },
          '6': { $value: '#116329' },
          '7': { $value: '#044f1e' },
          '8': { $value: '#003d16' },
          '9': { $value: '#002d11' },
        },
        yellow: {
          '0': { $value: '#fff8c5' },
          '1': { $value: '#fae17d' },
          '2': { $value: '#eac54f' },
          '3': { $value: '#d4a72c' },
          '4': { $value: '#bf8700' },
          '5': { $value: '#9a6700' },
          '6': { $value: '#7d4e00' },
          '7': { $value: '#633c01' },
          '8': { $value: '#4d2d00' },
          '9': { $value: '#3b2300' },
        },
        orange: {
          '0': { $value: '#fff1e5' },
          '1': { $value: '#ffd8b5' },
          '2': { $value: '#ffb77c' },
          '3': { $value: '#fb8f44' },
          '4': { $value: '#e16f24' },
          '5': { $value: '#bc4c00' },
          '6': { $value: '#953800' },
          '7': { $value: '#762c00' },
          '8': { $value: '#5c2200' },
          '9': { $value: '#471700' },
        },
        red: {
          '0': { $value: '#ffebe9' },
          '1': { $value: '#ffcecb' },
          '2': { $value: '#ffaba8' },
          '3': { $value: '#ff8182' },
          '4': { $value: '#fa4549' },
          '5': { $value: '#cf222e' },
          '6': { $value: '#a40e26' },
          '7': { $value: '#82071e' },
          '8': { $value: '#660018' },
          '9': { $value: '#4c0014' },
        },
        purple: {
          '0': { $value: '#fbefff' },
          '1': { $value: '#ecd8ff' },
          '2': { $value: '#d8b9ff' },
          '3': { $value: '#c297ff' },
          '4': { $value: '#a475f9' },
          '5': { $value: '#8250df' },
          '6': { $value: '#6639ba' },
          '7': { $value: '#512a97' },
          '8': { $value: '#3e1f79' },
          '9': { $value: '#2e1461' },
        },
        pink: {
          '0': { $value: '#ffeff7' },
          '1': { $value: '#ffd3eb' },
          '2': { $value: '#ffadda' },
          '3': { $value: '#ff80c8' },
          '4': { $value: '#e85aad' },
          '5': { $value: '#bf3989' },
          '6': { $value: '#99286e' },
          '7': { $value: '#772057' },
          '8': { $value: '#611347' },
          '9': { $value: '#4d0336' },
        },
        coral: {
          '0': { $value: '#fff0eb' },
          '1': { $value: '#ffd6cc' },
          '2': { $value: '#ffb4a1' },
          '3': { $value: '#fd8c73' },
          '4': { $value: '#ec6547' },
          '5': { $value: '#c4432b' },
          '6': { $value: '#9e2f1c' },
          '7': { $value: '#801f0f' },
          '8': { $value: '#691105' },
          '9': { $value: '#510901' },
        },
      },
    },
  }),
  'base/motion/easing.tokens.json': JSON.stringify({
    base: {
      easing: {
        $type: 'cubicBezier',
        linear: {
          $value: [0, 0, 1, 1],
          $description:
            'Ideal for non-movement properties, like opacity or background color.',
        },
        easeIn: {
          $value: [0.7, 0.1, 0.75, 0.9],
          $description:
            'Ideal for movement that starts on the page and ends off the page.',
        },
        easeOut: {
          $value: [0.3, 0.8, 0.6, 1],
          $description:
            'Ideal for movement that starts off the page and ends on the page.',
        },
        easeInOut: {
          $value: [0.6, 0, 0.2, 1],
          $description: 'Ideal for movement that starts and ends on the page.',
        },
      },
    },
  }),
  'base/motion/timing.tokens.json': JSON.stringify({
    base: {
      duration: {
        $type: 'duration',
        '0': { $value: '0ms' },
        '50': { $value: '50ms' },
        '100': { $value: '100ms' },
        '200': { $value: '200ms' },
        '300': { $value: '300ms' },
        '400': { $value: '400ms' },
        '500': { $value: '500ms' },
        '600': { $value: '600ms' },
        '700': { $value: '700ms' },
        '800': { $value: '800ms' },
        '900': { $value: '900ms' },
        '1000': { $value: '1000ms' },
      },
    },
  }),
  'base/size/size.tokens.json': JSON.stringify({
    base: {
      size: {
        $type: 'dimension',
        '2': { $value: '2px' },
        '4': { $value: '4px' },
        '6': { $value: '6px' },
        '8': { $value: '8px' },
        '12': { $value: '12px' },
        '16': { $value: '16px' },
        '20': { $value: '20px' },
        '24': { $value: '24px' },
        '28': { $value: '28px' },
        '32': { $value: '32px' },
        '36': { $value: '36px' },
        '40': { $value: '40px' },
        '44': { $value: '44px' },
        '48': { $value: '48px' },
        '64': { $value: '64px' },
        '80': { $value: '80px' },
        '96': { $value: '96px' },
        '112': { $value: '112px' },
        '128': { $value: '128px' },
      },
    },
  }),
  'base/typography/typography.tokens.json': JSON.stringify({
    base: {
      text: {
        weight: {
          $type: 'fontWeight',
          light: { $value: 300 },
          normal: { $value: 400 },
          medium: { $value: 500 },
          semibold: { $value: 600 },
        },
      },
    },
  }),
  'functional/border/border.tokens.json': JSON.stringify({
    focus: {
      outline: {
        $value: { color: '{focus.outlineColor}', style: 'solid', width: '2px' },
        $type: 'border',
      },
    },
    border: {
      $type: 'border',
      default: {
        $value: {
          color: '{borderColor.default}',
          style: 'solid',
          width: '{borderWidth.default}',
        },
      },
      muted: {
        $value: {
          color: '{borderColor.muted}',
          style: 'solid',
          width: '{borderWidth.default}',
        },
      },
      emphasis: {
        $value: {
          color: '{borderColor.emphasis}',
          style: 'solid',
          width: '{borderWidth.default}',
        },
      },
      disabled: {
        $value: {
          color: '{borderColor.disabled}',
          style: 'solid',
          width: '{borderWidth.default}',
        },
      },
      transparent: {
        $value: {
          color: '{borderColor.transparent}',
          style: 'solid',
          width: '{borderWidth.default}',
        },
      },
      neutral: {
        emphasis: {
          $value: {
            color: '{borderColor.neutral.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.neutral.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
      accent: {
        emphasis: {
          $value: {
            color: '{borderColor.accent.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.accent.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
      success: {
        emphasis: {
          $value: {
            color: '{borderColor.success.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.success.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
      open: {
        emphasis: { $value: '{border.success.emphasis}' },
        muted: { $value: '{border.success.muted}' },
      },
      danger: {
        emphasis: {
          $value: {
            color: '{borderColor.danger.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.danger.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
      closed: {
        emphasis: { $value: '{border.danger.emphasis}' },
        muted: { $value: '{border.danger.muted}' },
      },
      attention: {
        emphasis: {
          $value: {
            color: '{borderColor.attention.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.attention.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
      severe: {
        emphasis: {
          $value: {
            color: '{borderColor.severe.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.severe.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
      done: {
        emphasis: {
          $value: {
            color: '{borderColor.done.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.done.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
      upsell: {
        emphasis: {
          $value: {
            color: '{borderColor.upsell.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.upsell.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
      sponsors: {
        emphasis: {
          $value: {
            color: '{borderColor.sponsors.emphasis}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
        muted: {
          $value: {
            color: '{borderColor.sponsors.muted}',
            style: 'solid',
            width: '{borderWidth.default}',
          },
        },
      },
    },
  }),
  'functional/color/bgColor.tokens.json': JSON.stringify({
    bgColor: {
      default: { $value: '{base.color.neutral.0}' },
      muted: { $value: '{base.color.neutral.1}' },
      inset: { $value: '{bgColor.muted}' },
      emphasis: { $value: '{base.color.neutral.12}' },
      inverse: { $value: '{base.color.neutral.12}' },
      white: { $value: '{base.color.neutral.0}' },
      black: { $value: '{base.color.neutral.13}' },
      disabled: { $value: '{base.color.neutral.2}' },
      transparent: { $value: '{base.color.transparent}' },
      neutral: {
        muted: { $value: '{base.color.neutral.8}' },
        emphasis: { $value: '{base.color.neutral.9}' },
      },
      accent: {
        muted: { $value: '{base.color.blue.0}' },
        emphasis: { $value: '{base.color.blue.5}' },
      },
      success: {
        muted: { $value: '{base.color.green.0}' },
        emphasis: { $value: '#1f883d', $type: 'color' },
      },
      open: {
        muted: { $value: '{bgColor.success.muted}' },
        emphasis: { $value: '{bgColor.success.emphasis}' },
      },
      attention: {
        muted: { $value: '{base.color.yellow.0}' },
        emphasis: { $value: '{base.color.yellow.5}' },
      },
      severe: {
        muted: { $value: '{base.color.orange.0}' },
        emphasis: { $value: '{base.color.orange.5}' },
      },
      danger: {
        muted: { $value: '{base.color.red.0}' },
        emphasis: { $value: '{base.color.red.5}' },
      },
      closed: {
        muted: { $value: '{bgColor.danger.muted}' },
        emphasis: { $value: '{bgColor.danger.emphasis}' },
      },
      done: {
        muted: { $value: '{base.color.purple.0}' },
        emphasis: { $value: '{base.color.purple.5}' },
      },
      upsell: {
        muted: { $value: '{bgColor.done.muted}' },
        emphasis: { $value: '{bgColor.done.emphasis}' },
      },
      sponsors: {
        muted: { $value: '{base.color.pink.0}' },
        emphasis: { $value: '{base.color.pink.5}' },
      },
    },
  }),
  'functional/color/borderColor.tokens.json': JSON.stringify({
    borderColor: {
      default: { $value: '{base.color.neutral.6}' },
      muted: { $value: '{borderColor.default}', alpha: 0.7 },
      emphasis: { $value: '{base.color.neutral.8}' },
      disabled: { $value: '{base.color.neutral.8}', alpha: 0.1 },
      transparent: { $value: '{base.color.transparent}' },
      translucent: { $value: '{base.color.neutral.13}', alpha: 0.15 },
      neutral: {
        muted: { $value: '{borderColor.muted}' },
        emphasis: { $value: '{base.color.neutral.9}' },
      },
      accent: {
        muted: { $value: '{base.color.blue.3}', alpha: 0.4 },
        emphasis: { $value: '{base.color.blue.5}' },
      },
      success: {
        muted: { $value: '{base.color.green.3}', alpha: 0.4 },
        emphasis: { $value: '{base.color.green.5}' },
      },
      open: {
        muted: { $value: '{borderColor.success.muted}' },
        emphasis: { $value: '{borderColor.success.emphasis}' },
      },
      attention: {
        muted: { $value: '{base.color.yellow.3}', alpha: 0.4 },
        emphasis: { $value: '{base.color.yellow.5}' },
      },
      severe: {
        muted: { $value: '{base.color.orange.3}', alpha: 0.4 },
        emphasis: { $value: '{base.color.orange.5}' },
      },
      danger: {
        muted: { $value: '{base.color.red.3}', alpha: 0.4 },
        emphasis: { $value: '{base.color.red.5}' },
      },
      closed: {
        muted: { $value: '{borderColor.danger.muted}' },
        emphasis: { $value: '{borderColor.danger.emphasis}' },
      },
      done: {
        muted: { $value: '{base.color.purple.3}', alpha: 0.4 },
        emphasis: { $value: '{base.color.purple.5}' },
      },
      upsell: {
        muted: { $value: '{borderColor.done.muted}' },
        emphasis: { $value: '{borderColor.done.emphasis}' },
      },
      sponsors: {
        muted: { $value: '{base.color.pink.3}', alpha: 0.4 },
        emphasis: { $value: '{base.color.pink.5}' },
      },
    },
  }),
  'functional/color/control.tokens.json': JSON.stringify({
    control: {
      bgColor: {
        rest: { $value: '{base.color.neutral.1}' },
        hover: { $value: '{base.color.neutral.2}' },
        active: { $value: '{base.color.neutral.3}' },
        disabled: { $value: '{bgColor.disabled}' },
        selected: { $value: '{control.bgColor.rest}' },
      },
      fgColor: {
        rest: { $value: '{base.color.neutral.12}' },
        placeholder: { $value: '{fgColor.muted}' },
        disabled: { $value: '{fgColor.disabled}' },
      },
      borderColor: {
        rest: { $value: '{borderColor.default}' },
        emphasis: { $value: '{borderColor.emphasis}' },
        disabled: { $value: '{borderColor.disabled}' },
        selected: { $value: '{control.bgColor.selected}' },
        success: { $value: '{borderColor.success.emphasis}' },
        danger: { $value: '{borderColor.danger.emphasis}' },
        warning: { $value: '{borderColor.attention.emphasis}' },
      },
      iconColor: { rest: { $value: '{fgColor.muted}' } },
      transparent: {
        bgColor: {
          rest: { $value: '{base.color.transparent}' },
          hover: { $value: '{base.color.neutral.8}', alpha: 0.1 },
          active: { $value: '{base.color.neutral.8}', alpha: 0.15 },
          disabled: { $value: '{bgColor.disabled}' },
          selected: { $value: '{base.color.neutral.8}', alpha: 0.15 },
        },
        borderColor: {
          rest: { $value: '{base.color.transparent}' },
          hover: { $value: '{base.color.transparent}' },
          active: { $value: '{base.color.transparent}' },
        },
      },
      danger: {
        fgColor: {
          rest: { $value: '{fgColor.danger}' },
          hover: { $value: '{fgColor.danger}' },
        },
        bgColor: {
          hover: { $value: '{bgColor.danger.muted}' },
          active: { $value: '{bgColor.danger.muted}' },
        },
      },
      checked: {
        bgColor: {
          rest: { $value: '{bgColor.accent.emphasis}' },
          hover: { $value: '#0860ca', $type: 'color' },
          active: { $value: '#0757ba', $type: 'color' },
          disabled: { $value: '{fgColor.disabled}' },
        },
        fgColor: {
          rest: { $value: '{fgColor.onEmphasis}' },
          disabled: { $value: '{fgColor.onEmphasis}' },
        },
        borderColor: {
          rest: { $value: '{control.checked.bgColor.rest}' },
          hover: { $value: '{control.checked.bgColor.hover}' },
          active: { $value: '{control.checked.bgColor.active}' },
          disabled: { $value: '{control.checked.bgColor.disabled}' },
        },
      },
    },
    controlTrack: {
      bgColor: {
        rest: { $value: '{base.color.neutral.3}' },
        hover: { $value: '{base.color.neutral.4}' },
        active: { $value: '{base.color.neutral.5}' },
        disabled: { $value: '{fgColor.disabled}' },
      },
      fgColor: {
        rest: { $value: '{base.color.neutral.9}' },
        disabled: { $value: '{fgColor.onEmphasis}' },
      },
      borderColor: {
        rest: { $value: '{borderColor.default}' },
        disabled: { $value: '{fgColor.disabled}' },
      },
    },
    controlKnob: {
      bgColor: {
        rest: { $value: '{base.color.neutral.0}' },
        disabled: { $value: '{control.bgColor.disabled}' },
        checked: { $value: '{base.color.neutral.0}' },
      },
      borderColor: {
        rest: { $value: '{control.borderColor.emphasis}' },
        disabled: { $value: '{control.bgColor.disabled}' },
        checked: { $value: '{control.checked.bgColor.rest}' },
      },
    },
  }),
  'functional/color/control.dark.tokens.json': JSON.stringify({
    control: {
      transparent: {
        bgColor: {
          hover: { $value: '{base.color.neutral.8}', alpha: 0.2 },
          active: { $value: '{base.color.neutral.8}', alpha: 0.25 },
        },
      },
    },
  }),
  'functional/color/control.dark-high-contrast.tokens.json': JSON.stringify({
    control: {
      transparent: {
        bgColor: {
          hover: { $value: '{base.color.neutral.6}', alpha: 1 },
          active: { $value: '{base.color.neutral.7}', alpha: 1 },
        },
      },
    },
  }),
  'functional/color/control.dark-dimmed.tokens.json': JSON.stringify({
    control: {
      transparent: {
        bgColor: {
          hover: { $value: '{base.color.neutral.8}', alpha: 0.15 },
          active: { $value: '{base.color.neutral.8}', alpha: 0.2 },
        },
      },
    },
  }),
  'functional/color/control.light-high-contrast.tokens.json': JSON.stringify({
    control: {
      transparent: {
        bgColor: {
          hover: { $value: '{base.color.neutral.5}', alpha: 1 },
          cactive: { $value: '{base.color.neutral.6}', alpha: 1 },
        },
      },
    },
  }),
  'functional/color/data-vis.tokens.json': JSON.stringify({
    data: {
      blue: {
        color: {
          emphasis: { $value: '{base.display.color.blue.5}' },
          muted: { $value: '{base.display.color.blue.0}' },
        },
      },
      auburn: {
        color: {
          emphasis: { $value: '{base.display.color.auburn.5}' },
          muted: { $value: '{base.display.color.auburn.0}' },
        },
      },
      orange: {
        color: {
          emphasis: { $value: '{base.display.color.orange.4}' },
          muted: { $value: '{base.display.color.orange.0}' },
        },
      },
      yellow: {
        color: {
          emphasis: { $value: '{base.display.color.yellow.4}' },
          muted: { $value: '{base.display.color.yellow.0}' },
        },
      },
      green: {
        color: {
          emphasis: { $value: '{base.display.color.green.4}' },
          muted: { $value: '{base.display.color.green.0}' },
        },
      },
      teal: {
        color: {
          emphasis: { $value: '{base.display.color.teal.4}' },
          muted: { $value: '{base.display.color.teal.0}' },
        },
      },
      purple: {
        color: {
          emphasis: { $value: '{base.display.color.purple.5}' },
          muted: { $value: '{base.display.color.purple.0}' },
        },
      },
      pink: {
        color: {
          emphasis: { $value: '{base.display.color.pink.5}' },
          muted: { $value: '{base.display.color.pink.0}' },
        },
      },
      plum: {
        color: {
          emphasis: { $value: '{base.display.color.plum.5}' },
          muted: { $value: '{base.display.color.plum.0}' },
        },
      },
      red: {
        color: {
          emphasis: { $value: '{base.display.color.red.5}' },
          muted: { $value: '{base.display.color.red.0}' },
        },
      },
      gray: {
        color: {
          emphasis: { $value: '{base.display.color.gray.4}' },
          muted: { $value: '{base.display.color.gray.0}' },
        },
      },
      coral: {
        color: {
          emphasis: { $value: '{base.display.color.coral.5}' },
          muted: { $value: '{base.display.color.coral.0}' },
        },
      },
      brown: {
        color: {
          emphasis: { $value: '{base.display.color.brown.5}' },
          muted: { $value: '{base.display.color.brown.0}' },
        },
      },
      lemon: {
        color: {
          emphasis: { $value: '{base.display.color.lemon.5}' },
          muted: { $value: '{base.display.color.lemon.0}' },
        },
      },
      olive: {
        color: {
          emphasis: { $value: '{base.display.color.olive.5}' },
          muted: { $value: '{base.display.color.olive.0}' },
        },
      },
      lime: {
        color: {
          emphasis: { $value: '{base.display.color.lime.5}' },
          muted: { $value: '{base.display.color.lime.0}' },
        },
      },
      pine: {
        color: {
          emphasis: { $value: '{base.display.color.pine.5}' },
          muted: { $value: '{base.display.color.pine.0}' },
        },
      },
    },
  }),
  'functional/color/display.tokens.json': JSON.stringify({
    display: {
      blue: {
        scale: {
          '0': { $value: '{base.display.color.blue.0}' },
          '1': { $value: '{base.display.color.blue.1}' },
          '2': { $value: '{base.display.color.blue.2}' },
          '3': { $value: '{base.display.color.blue.3}' },
          '4': { $value: '{base.display.color.blue.4}' },
          '5': { $value: '{base.display.color.blue.5}' },
          '6': { $value: '{base.display.color.blue.6}' },
          '7': { $value: '{base.display.color.blue.7}' },
          '8': { $value: '{base.display.color.blue.8}' },
          '9': { $value: '{base.display.color.blue.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.blue.0}' },
          emphasis: { $value: '{base.display.color.blue.5}' },
        },
        fgColor: { $value: '{base.display.color.blue.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.blue.1}' },
          emphasis: { $value: '{base.display.color.blue.5}' },
        },
      },
      green: {
        scale: {
          '0': { $value: '{base.display.color.green.0}' },
          '1': { $value: '{base.display.color.green.1}' },
          '2': { $value: '{base.display.color.green.2}' },
          '3': { $value: '{base.display.color.green.3}' },
          '4': { $value: '{base.display.color.green.4}' },
          '5': { $value: '{base.display.color.green.5}' },
          '6': { $value: '{base.display.color.green.6}' },
          '7': { $value: '{base.display.color.green.7}' },
          '8': { $value: '{base.display.color.green.8}' },
          '9': { $value: '{base.display.color.green.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.green.0}' },
          emphasis: { $value: '{base.display.color.green.5}' },
        },
        fgColor: { $value: '{base.display.color.green.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.green.1}' },
          emphasis: { $value: '{base.display.color.green.5}' },
        },
      },
      orange: {
        scale: {
          '0': { $value: '{base.display.color.orange.0}' },
          '1': { $value: '{base.display.color.orange.1}' },
          '2': { $value: '{base.display.color.orange.2}' },
          '3': { $value: '{base.display.color.orange.3}' },
          '4': { $value: '{base.display.color.orange.4}' },
          '5': { $value: '{base.display.color.orange.5}' },
          '6': { $value: '{base.display.color.orange.6}' },
          '7': { $value: '{base.display.color.orange.7}' },
          '8': { $value: '{base.display.color.orange.8}' },
          '9': { $value: '{base.display.color.orange.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.orange.0}' },
          emphasis: { $value: '{base.display.color.orange.5}' },
        },
        fgColor: { $value: '{base.display.color.orange.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.orange.1}' },
          emphasis: { $value: '{base.display.color.orange.5}' },
        },
      },
      purple: {
        scale: {
          '0': { $value: '{base.display.color.purple.0}' },
          '1': { $value: '{base.display.color.purple.1}' },
          '2': { $value: '{base.display.color.purple.2}' },
          '3': { $value: '{base.display.color.purple.3}' },
          '4': { $value: '{base.display.color.purple.4}' },
          '5': { $value: '{base.display.color.purple.5}' },
          '6': { $value: '{base.display.color.purple.6}' },
          '7': { $value: '{base.display.color.purple.7}' },
          '8': { $value: '{base.display.color.purple.8}' },
          '9': { $value: '{base.display.color.purple.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.purple.0}' },
          emphasis: { $value: '{base.display.color.purple.5}' },
        },
        fgColor: { $value: '{base.display.color.purple.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.purple.1}' },
          emphasis: { $value: '{base.display.color.purple.5}' },
        },
      },
      plum: {
        scale: {
          '0': { $value: '{base.display.color.plum.0}' },
          '1': { $value: '{base.display.color.plum.1}' },
          '2': { $value: '{base.display.color.plum.2}' },
          '3': { $value: '{base.display.color.plum.3}' },
          '4': { $value: '{base.display.color.plum.4}' },
          '5': { $value: '{base.display.color.plum.5}' },
          '6': { $value: '{base.display.color.plum.6}' },
          '7': { $value: '{base.display.color.plum.7}' },
          '8': { $value: '{base.display.color.plum.8}' },
          '9': { $value: '{base.display.color.plum.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.plum.0}' },
          emphasis: { $value: '{base.display.color.plum.5}' },
        },
        fgColor: { $value: '{base.display.color.plum.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.plum.1}' },
          emphasis: { $value: '{base.display.color.plum.5}' },
        },
      },
      red: {
        scale: {
          '0': { $value: '{base.display.color.red.0}' },
          '1': { $value: '{base.display.color.red.1}' },
          '2': { $value: '{base.display.color.red.2}' },
          '3': { $value: '{base.display.color.red.3}' },
          '4': { $value: '{base.display.color.red.4}' },
          '5': { $value: '{base.display.color.red.5}' },
          '6': { $value: '{base.display.color.red.6}' },
          '7': { $value: '{base.display.color.red.7}' },
          '8': { $value: '{base.display.color.red.8}' },
          '9': { $value: '{base.display.color.red.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.red.0}' },
          emphasis: { $value: '{base.display.color.red.5}' },
        },
        fgColor: { $value: '{base.display.color.red.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.red.1}' },
          emphasis: { $value: '{base.display.color.red.5}' },
        },
      },
      coral: {
        scale: {
          '0': { $value: '{base.display.color.coral.0}' },
          '1': { $value: '{base.display.color.coral.1}' },
          '2': { $value: '{base.display.color.coral.2}' },
          '3': { $value: '{base.display.color.coral.3}' },
          '4': { $value: '{base.display.color.coral.4}' },
          '5': { $value: '{base.display.color.coral.5}' },
          '6': { $value: '{base.display.color.coral.6}' },
          '7': { $value: '{base.display.color.coral.7}' },
          '8': { $value: '{base.display.color.coral.8}' },
          '9': { $value: '{base.display.color.coral.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.coral.0}' },
          emphasis: { $value: '{base.display.color.coral.5}' },
        },
        fgColor: { $value: '{base.display.color.coral.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.coral.1}' },
          emphasis: { $value: '{base.display.color.coral.5}' },
        },
      },
      yellow: {
        scale: {
          '0': { $value: '{base.display.color.yellow.0}' },
          '1': { $value: '{base.display.color.yellow.1}' },
          '2': { $value: '{base.display.color.yellow.2}' },
          '3': { $value: '{base.display.color.yellow.3}' },
          '4': { $value: '{base.display.color.yellow.4}' },
          '5': { $value: '{base.display.color.yellow.5}' },
          '6': { $value: '{base.display.color.yellow.6}' },
          '7': { $value: '{base.display.color.yellow.7}' },
          '8': { $value: '{base.display.color.yellow.8}' },
          '9': { $value: '{base.display.color.yellow.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.yellow.0}' },
          emphasis: { $value: '{base.display.color.yellow.5}' },
        },
        fgColor: { $value: '{base.display.color.yellow.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.yellow.1}' },
          emphasis: { $value: '{base.display.color.yellow.5}' },
        },
      },
      gray: {
        scale: {
          '0': { $value: '{base.display.color.gray.0}' },
          '1': { $value: '{base.display.color.gray.1}' },
          '2': { $value: '{base.display.color.gray.2}' },
          '3': { $value: '{base.display.color.gray.3}' },
          '4': { $value: '{base.display.color.gray.4}' },
          '5': { $value: '{base.display.color.gray.5}' },
          '6': { $value: '{base.display.color.gray.6}' },
          '7': { $value: '{base.display.color.gray.7}' },
          '8': { $value: '{base.display.color.gray.8}' },
          '9': { $value: '{base.display.color.gray.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.gray.0}' },
          emphasis: { $value: '{base.display.color.gray.5}' },
        },
        fgColor: { $value: '{base.display.color.gray.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.gray.1}' },
          emphasis: { $value: '{base.display.color.gray.5}' },
        },
      },
      auburn: {
        scale: {
          '0': { $value: '{base.display.color.auburn.0}' },
          '1': { $value: '{base.display.color.auburn.1}' },
          '2': { $value: '{base.display.color.auburn.2}' },
          '3': { $value: '{base.display.color.auburn.3}' },
          '4': { $value: '{base.display.color.auburn.4}' },
          '5': { $value: '{base.display.color.auburn.5}' },
          '6': { $value: '{base.display.color.auburn.6}' },
          '7': { $value: '{base.display.color.auburn.7}' },
          '8': { $value: '{base.display.color.auburn.8}' },
          '9': { $value: '{base.display.color.auburn.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.auburn.0}' },
          emphasis: { $value: '{base.display.color.auburn.5}' },
        },
        fgColor: { $value: '{base.display.color.auburn.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.auburn.1}' },
          emphasis: { $value: '{base.display.color.auburn.5}' },
        },
      },
      brown: {
        scale: {
          '0': { $value: '{base.display.color.brown.0}' },
          '1': { $value: '{base.display.color.brown.1}' },
          '2': { $value: '{base.display.color.brown.2}' },
          '3': { $value: '{base.display.color.brown.3}' },
          '4': { $value: '{base.display.color.brown.4}' },
          '5': { $value: '{base.display.color.brown.5}' },
          '6': { $value: '{base.display.color.brown.6}' },
          '7': { $value: '{base.display.color.brown.7}' },
          '8': { $value: '{base.display.color.brown.8}' },
          '9': { $value: '{base.display.color.brown.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.brown.0}' },
          emphasis: { $value: '{base.display.color.brown.5}' },
        },
        fgColor: { $value: '{base.display.color.brown.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.brown.1}' },
          emphasis: { $value: '{base.display.color.brown.5}' },
        },
      },
      lemon: {
        scale: {
          '0': { $value: '{base.display.color.lemon.0}' },
          '1': { $value: '{base.display.color.lemon.1}' },
          '2': { $value: '{base.display.color.lemon.2}' },
          '3': { $value: '{base.display.color.lemon.3}' },
          '4': { $value: '{base.display.color.lemon.4}' },
          '5': { $value: '{base.display.color.lemon.5}' },
          '6': { $value: '{base.display.color.lemon.6}' },
          '7': { $value: '{base.display.color.lemon.7}' },
          '8': { $value: '{base.display.color.lemon.8}' },
          '9': { $value: '{base.display.color.lemon.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.lemon.0}' },
          emphasis: { $value: '{base.display.color.lemon.5}' },
        },
        fgColor: { $value: '{base.display.color.lemon.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.lemon.1}' },
          emphasis: { $value: '{base.display.color.lemon.5}' },
        },
      },
      olive: {
        scale: {
          '0': { $value: '{base.display.color.olive.0}' },
          '1': { $value: '{base.display.color.olive.1}' },
          '2': { $value: '{base.display.color.olive.2}' },
          '3': { $value: '{base.display.color.olive.3}' },
          '4': { $value: '{base.display.color.olive.4}' },
          '5': { $value: '{base.display.color.olive.5}' },
          '6': { $value: '{base.display.color.olive.6}' },
          '7': { $value: '{base.display.color.olive.7}' },
          '8': { $value: '{base.display.color.olive.8}' },
          '9': { $value: '{base.display.color.olive.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.olive.0}' },
          emphasis: { $value: '{base.display.color.olive.5}' },
        },
        fgColor: { $value: '{base.display.color.olive.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.olive.1}' },
          emphasis: { $value: '{base.display.color.olive.5}' },
        },
      },
      lime: {
        scale: {
          '0': { $value: '{base.display.color.lime.0}' },
          '1': { $value: '{base.display.color.lime.1}' },
          '2': { $value: '{base.display.color.lime.2}' },
          '3': { $value: '{base.display.color.lime.3}' },
          '4': { $value: '{base.display.color.lime.4}' },
          '5': { $value: '{base.display.color.lime.5}' },
          '6': { $value: '{base.display.color.lime.6}' },
          '7': { $value: '{base.display.color.lime.7}' },
          '8': { $value: '{base.display.color.lime.8}' },
          '9': { $value: '{base.display.color.lime.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.lime.0}' },
          emphasis: { $value: '{base.display.color.lime.5}' },
        },
        fgColor: { $value: '{base.display.color.lime.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.lime.1}' },
          emphasis: { $value: '{base.display.color.lime.5}' },
        },
      },
      pine: {
        scale: {
          '0': { $value: '{base.display.color.pine.0}' },
          '1': { $value: '{base.display.color.pine.1}' },
          '2': { $value: '{base.display.color.pine.2}' },
          '3': { $value: '{base.display.color.pine.3}' },
          '4': { $value: '{base.display.color.pine.4}' },
          '5': { $value: '{base.display.color.pine.5}' },
          '6': { $value: '{base.display.color.pine.6}' },
          '7': { $value: '{base.display.color.pine.7}' },
          '8': { $value: '{base.display.color.pine.8}' },
          '9': { $value: '{base.display.color.pine.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.pine.0}' },
          emphasis: { $value: '{base.display.color.pine.5}' },
        },
        fgColor: { $value: '{base.display.color.pine.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.pine.1}' },
          emphasis: { $value: '{base.display.color.pine.5}' },
        },
      },
      teal: {
        scale: {
          '0': { $value: '{base.display.color.teal.0}' },
          '1': { $value: '{base.display.color.teal.1}' },
          '2': { $value: '{base.display.color.teal.2}' },
          '3': { $value: '{base.display.color.teal.3}' },
          '4': { $value: '{base.display.color.teal.4}' },
          '5': { $value: '{base.display.color.teal.5}' },
          '6': { $value: '{base.display.color.teal.6}' },
          '7': { $value: '{base.display.color.teal.7}' },
          '8': { $value: '{base.display.color.teal.8}' },
          '9': { $value: '{base.display.color.teal.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.teal.0}' },
          emphasis: { $value: '{base.display.color.teal.5}' },
        },
        fgColor: { $value: '{base.display.color.teal.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.teal.1}' },
          emphasis: { $value: '{base.display.color.teal.5}' },
        },
      },
      cyan: {
        scale: {
          '0': { $value: '{base.display.color.cyan.0}' },
          '1': { $value: '{base.display.color.cyan.1}' },
          '2': { $value: '{base.display.color.cyan.2}' },
          '3': { $value: '{base.display.color.cyan.3}' },
          '4': { $value: '{base.display.color.cyan.4}' },
          '5': { $value: '{base.display.color.cyan.5}' },
          '6': { $value: '{base.display.color.cyan.6}' },
          '7': { $value: '{base.display.color.cyan.7}' },
          '8': { $value: '{base.display.color.cyan.8}' },
          '9': { $value: '{base.display.color.cyan.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.cyan.0}' },
          emphasis: { $value: '{base.display.color.cyan.5}' },
        },
        fgColor: { $value: '{base.display.color.cyan.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.cyan.1}' },
          emphasis: { $value: '{base.display.color.cyan.5}' },
        },
      },
      indigo: {
        scale: {
          '0': { $value: '{base.display.color.indigo.0}' },
          '1': { $value: '{base.display.color.indigo.1}' },
          '2': { $value: '{base.display.color.indigo.2}' },
          '3': { $value: '{base.display.color.indigo.3}' },
          '4': { $value: '{base.display.color.indigo.4}' },
          '5': { $value: '{base.display.color.indigo.5}' },
          '6': { $value: '{base.display.color.indigo.6}' },
          '7': { $value: '{base.display.color.indigo.7}' },
          '8': { $value: '{base.display.color.indigo.8}' },
          '9': { $value: '{base.display.color.indigo.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.indigo.0}' },
          emphasis: { $value: '{base.display.color.indigo.5}' },
        },
        fgColor: { $value: '{base.display.color.indigo.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.indigo.1}' },
          emphasis: { $value: '{base.display.color.indigo.5}' },
        },
      },
      pink: {
        scale: {
          '0': { $value: '{base.display.color.pink.0}' },
          '1': { $value: '{base.display.color.pink.1}' },
          '2': { $value: '{base.display.color.pink.2}' },
          '3': { $value: '{base.display.color.pink.3}' },
          '4': { $value: '{base.display.color.pink.4}' },
          '5': { $value: '{base.display.color.pink.5}' },
          '6': { $value: '{base.display.color.pink.6}' },
          '7': { $value: '{base.display.color.pink.7}' },
          '8': { $value: '{base.display.color.pink.8}' },
          '9': { $value: '{base.display.color.pink.9}' },
        },
        bgColor: {
          muted: { $value: '{base.display.color.pink.0}' },
          emphasis: { $value: '{base.display.color.pink.5}' },
        },
        fgColor: { $value: '{base.display.color.pink.6}' },
        borderColor: {
          muted: { $value: '{base.display.color.pink.1}' },
          emphasis: { $value: '{base.display.color.pink.5}' },
        },
      },
    },
  }),
  'functional/color/fgColor.tokens.json': JSON.stringify({
    fgColor: {
      default: { $value: '{base.color.neutral.13}' },
      muted: { $value: '{base.color.neutral.9}' },
      onEmphasis: { $value: '{base.color.neutral.0}' },
      onInverse: { $value: '{base.color.neutral.0}' },
      white: { $value: '{base.color.neutral.0}' },
      black: { $value: '{base.color.neutral.13}' },
      disabled: { $value: '{base.color.neutral.8}' },
      link: { $value: '{fgColor.accent}' },
      neutral: { $value: '{base.color.neutral.9}' },
      accent: { $value: '{base.color.blue.5}' },
      success: { $value: '{base.color.green.5}' },
      open: { $value: '{fgColor.success}' },
      attention: { $value: '{base.color.yellow.5}' },
      severe: { $value: '{base.color.orange.5}' },
      danger: { $value: '#d1242f', $type: 'color' },
      closed: { $value: '{fgColor.danger}' },
      done: { $value: '{base.color.purple.5}' },
      upsell: { $value: '{fgColor.done}' },
      sponsors: { $value: '{base.color.pink.5}' },
    },
  }),
  'functional/color/fgColor.dark.tokens.json': JSON.stringify({
    fgColor: {
      default: { $value: '{base.color.neutral.12}' },
    },
  }),
  'functional/color/fgColor.dark-dimmed.tokens.json': JSON.stringify({
    fgColor: {
      default: { $value: '{base.color.neutral.11}' },
    },
  }),
  'functional/color/fgColor.dark-high-contrast.tokens.json': JSON.stringify({
    fgColor: {
      default: { $value: '{base.color.neutral.13}' },
      muted: { $value: '{base.color.neutral.10}' },
    },
  }),
  'functional/color/fgColor.light-high-contrast.tokens.json': JSON.stringify({
    fgColor: {
      muted: { $value: '{base.color.neutral.10}' },
    },
  }),
  'functional/color/focus.tokens.json': JSON.stringify({
    focus: {
      outlineColor: { $value: '{borderColor.accent.emphasis}' },
    },
  }),
  'functional/color/selection.tokens.json': JSON.stringify({
    selection: {
      bgColor: { $value: '{bgColor.accent.emphasis}', alpha: 0.2 },
    },
  }),
  'functional/color/syntax.tokens.json': JSON.stringify({
    color: {
      ansi: {
        black: { $value: '{base.color.neutral.13}' },
        'black-bright': { $value: '{base.color.neutral.11}' },
        white: { $value: '{base.color.neutral.9}' },
        'white-bright': { $value: '{base.color.neutral.8}' },
        gray: { $value: '{base.color.neutral.9}' },
        red: { $value: '{base.color.red.5}' },
        'red-bright': { $value: '{base.color.red.6}' },
        green: { $value: '{base.color.green.6}' },
        'green-bright': { $value: '{base.color.green.5}' },
        yellow: { $value: '{base.color.yellow.8}' },
        'yellow-bright': { $value: '{base.color.yellow.7}' },
        blue: { $value: '{base.color.blue.5}' },
        'blue-bright': { $value: '{base.color.blue.4}' },
        magenta: { $value: '{base.color.purple.5}' },
        'magenta-bright': { $value: '{base.color.purple.4}' },
        cyan: { $value: '#1b7c83', $type: 'color' },
        'cyan-bright': { $value: '#3192aa', $type: 'color' },
      },
      prettylights: {
        syntax: {
          comment: { $value: '{base.color.neutral.9}' },
          constant: { $value: '{base.color.blue.6}' },
          'constant-other-reference-link': { $value: '{base.color.blue.8}' },
          entity: { $value: '{base.color.purple.6}' },
          storage: {
            modifier: {
              import: { $value: '{base.color.neutral.13}' },
            },
          },
          'entity-tag': { $value: '{base.color.blue.6}' },
          keyword: { $value: '{base.color.red.5}' },
          string: { $value: '{base.color.blue.8}' },
          variable: { $value: '{base.color.orange.6}' },
          brackethighlighter: {
            unmatched: { $value: '{base.color.red.7}' },
            angle: { $value: '{base.color.neutral.9}' },
          },
          invalid: {
            illegal: {
              text: { $value: '{base.color.neutral.1}' },
              bg: { $value: '{base.color.red.7}' },
            },
          },
          carriage: {
            return: {
              text: { $value: '{base.color.neutral.1}' },
              bg: { $value: '{base.color.red.5}' },
            },
          },
          'string-regexp': { $value: '{base.color.green.6}' },
          markup: {
            list: { $value: '{base.color.yellow.9}' },
            heading: { $value: '{base.color.blue.6}' },
            italic: { $value: '{base.color.neutral.13}' },
            bold: { $value: '{base.color.neutral.13}' },
            deleted: {
              text: { $value: '{base.color.red.7}' },
              bg: { $value: '{base.color.red.0}' },
            },
            inserted: {
              text: { $value: '{base.color.green.6}' },
              bg: { $value: '{base.color.green.0}' },
            },
            changed: {
              text: { $value: '{base.color.orange.6}' },
              bg: { $value: '{base.color.orange.1}' },
            },
            ignored: {
              text: { $value: '{base.color.neutral.6}' },
              bg: { $value: '{base.color.blue.6}' },
            },
          },
          meta: {
            diff: {
              range: { $value: '{base.color.purple.5}' },
            },
          },
          sublimelinter: {
            gutter: {
              mark: { $value: '{base.color.neutral.8}' },
            },
          },
        },
      },
    },
  }),
  'functional/shadow/shadow.tokens.json': JSON.stringify({
    shadow: {
      inset: {
        $value: {
          color: '{base.color.neutral.13}',
          alpha: 0.04,
          offsetX: '0px',
          offsetY: '1px',
          blur: '0px',
          spread: '0px',
          inset: true,
        },
        $type: 'shadow',
      },
      resting: {
        xsmall: {
          $value: {
            color: '{base.color.neutral.13}',
            alpha: 0.06,
            offsetX: '0px',
            offsetY: '1px',
            blur: '1px',
            spread: '0px',
            inset: false,
          },
          $type: 'shadow',
        },
        small: {
          $value: [
            {
              color: '{base.color.neutral.13}',
              alpha: 0.06,
              offsetX: '0px',
              offsetY: '1px',
              blur: '1px',
              spread: '0px',
              inset: false,
            },
            {
              color: '{base.color.neutral.13}',
              alpha: 0.06,
              offsetX: '0px',
              offsetY: '1px',
              blur: '3px',
              spread: '0px',
              inset: false,
            },
          ],
          $type: 'shadow',
        },
        medium: {
          $value: [
            {
              color: '{base.color.neutral.12}',
              alpha: 0.1,
              offsetX: '0px',
              offsetY: '1px',
              blur: '1px',
              spread: '0px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.12,
              offsetX: '0px',
              offsetY: '3px',
              blur: '6px',
              spread: '0px',
            },
          ],
          $type: 'shadow',
        },
      },
      floating: {
        small: {
          $value: [
            {
              color: '{overlay.borderColor}',
              alpha: 0.5,
              offsetX: '0px',
              offsetY: '0px',
              blur: '0px',
              spread: '1px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.04,
              offsetX: '0px',
              offsetY: '6px',
              blur: '12px',
              spread: '-3px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.12,
              offsetX: '0px',
              offsetY: '6px',
              blur: '18px',
              spread: '0px',
            },
          ],
          $type: 'shadow',
        },
        medium: {
          $value: [
            {
              color: '{overlay.borderColor}',
              alpha: 0,
              offsetX: '0px',
              offsetY: '0px',
              blur: '0px',
              spread: '1px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.08,
              offsetX: '0px',
              offsetY: '8px',
              blur: '16px',
              spread: '-4px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.08,
              offsetX: '0px',
              offsetY: '4px',
              blur: '32px',
              spread: '-4px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.08,
              offsetX: '0px',
              offsetY: '24px',
              blur: '48px',
              spread: '-12px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.08,
              offsetX: '0px',
              offsetY: '48px',
              blur: '96px',
              spread: '-24px',
            },
          ],
          $type: 'shadow',
        },
        large: {
          $value: [
            {
              color: '{overlay.borderColor}',
              alpha: 0,
              offsetX: '0px',
              offsetY: '0px',
              blur: '0px',
              spread: '1px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.24,
              offsetX: '0px',
              offsetY: '40px',
              blur: '80px',
              spread: '0px',
            },
          ],
          $type: 'shadow',
        },
        xlarge: {
          $value: [
            {
              color: '{overlay.borderColor}',
              alpha: 0,
              offsetX: '0px',
              offsetY: '0px',
              blur: '0px',
              spread: '1px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.32,
              offsetX: '0px',
              offsetY: '56px',
              blur: '112px',
              spread: '0px',
            },
          ],
          $type: 'shadow',
        },
        legacy: {
          $value: [
            {
              color: '{base.color.neutral.12}',
              alpha: 0.04,
              offsetX: '0px',
              offsetY: '6px',
              blur: '12px',
              spread: '-3px',
            },
            {
              color: '{base.color.neutral.12}',
              alpha: 0.12,
              offsetX: '0px',
              offsetY: '6px',
              blur: '18px',
              spread: '0px',
            },
          ],
          $type: 'shadow',
        },
      },
    },
  }),
  'functional/size/border.tokens.json': JSON.stringify({
    boxShadow: {
      thin: {
        $value: 'inset 0 0 0 {borderWidth.thin}',
        $description: 'Thin shadow for borders',
        $type: 'string',
      },
      thick: { $value: 'inset 0 0 0 {borderWidth.thick}' },
      thicker: { $value: 'inset 0 0 0 {borderWidth.thicker}' },
    },
    borderWidth: {
      default: { $value: '{borderWidth.thin}' },
      thin: { $value: '1px', $type: 'dimension' },
      thick: { $value: '2px', $type: 'dimension' },
      thicker: { $value: '4px', $type: 'dimension' },
    },
    borderRadius: {
      small: { $value: '3px', $type: 'dimension' },
      medium: { $value: '6px', $type: 'dimension' },
      large: { $value: '12px', $type: 'dimension' },
      full: {
        $value: '9999px',
        $type: 'dimension',
        $description: 'Use this border radius for pill shaped elements',
      },
      default: { $value: '{borderRadius.medium}' },
    },
    outline: {
      focus: {
        offset: { $value: '-2px', $type: 'dimension' },
        width: { $value: '2px', $type: 'dimension' },
      },
    },
  }),
  'functional/size/breakpoints.tokens.json': JSON.stringify({
    breakpoint: {
      xsmall: { $value: '320px', $type: 'dimension' },
      small: { $value: '544px', $type: 'dimension' },
      medium: { $value: '768px', $type: 'dimension' },
      large: { $value: '1012px', $type: 'dimension' },
      xlarge: { $value: '1280px', $type: 'dimension' },
      xxlarge: { $value: '1400px', $type: 'dimension' },
    },
  }),
  'functional/size/size.tokens.json': JSON.stringify({
    control: {
      minTarget: {
        fine: { $value: '{base.size.16}' },
        coarse: { $value: '{base.size.44}' },
      },
      xsmall: {
        size: { $value: '{base.size.24}' },
        lineBoxHeight: { $value: '{base.size.20}' },
        paddingBlock: { $value: '2px', $type: 'dimension' },
        paddingInline: {
          condensed: { $value: '{base.size.4}' },
          normal: { $value: '{base.size.8}' },
          spacious: { $value: '{base.size.12}' },
        },
        gap: { $value: '{base.size.4}' },
      },
      small: {
        size: { $value: '{base.size.28}' },
        lineBoxHeight: { $value: '{base.size.20}' },
        paddingBlock: { $value: '{base.size.4}' },
        paddingInline: {
          condensed: { $value: '{base.size.8}' },
          normal: { $value: '{base.size.12}' },
        },
        gap: { $value: '{base.size.4}' },
      },
      medium: {
        size: { $value: '{base.size.32}' },
        lineBoxHeight: { $value: '{base.size.20}' },
        paddingBlock: { $value: '6px', $type: 'dimension' },
        paddingInline: {
          condensed: { $value: '{base.size.8}' },
          normal: { $value: '{base.size.12}' },
          spacious: { $value: '{base.size.16}' },
        },
        gap: { $value: '{base.size.8}' },
      },
      large: {
        size: { $value: '{base.size.40}' },
        lineBoxHeight: { $value: '{base.size.20}' },
        paddingBlock: { $value: '10px', $type: 'dimension' },
        paddingInline: {
          normal: { $value: '{base.size.12}' },
          spacious: { $value: '{base.size.16}' },
        },
        gap: { $value: '{base.size.8}' },
      },
      xlarge: {
        size: { $value: '{base.size.48}' },
        lineBoxHeight: { $value: '{base.size.20}' },
        paddingBlock: { $value: '14px', $type: 'dimension' },
        paddingInline: {
          normal: { $value: '{base.size.12}' },
          spacious: { $value: '{base.size.16}' },
        },
        gap: { $value: '{base.size.8}' },
      },
    },
    spinner: {
      strokeWidth: {
        default: { $value: '2px', $type: 'dimension' },
      },
      size: {
        small: { $value: '{base.size.16}' },
        medium: { $value: '{base.size.32}' },
        large: { $value: '{base.size.64}' },
      },
    },
    stack: {
      padding: {
        condensed: { $value: '{base.size.8}' },
        normal: { $value: '{base.size.16}' },
        spacious: { $value: '{base.size.24}' },
      },
      gap: {
        condensed: { $value: '{base.size.8}' },
        normal: { $value: '{base.size.16}' },
        spacious: { $value: '{base.size.24}' },
      },
    },
    controlStack: {
      small: {
        gap: {
          condensed: { $value: '{base.size.8}' },
          spacious: { $value: '{base.size.16}' },
        },
      },
      medium: {
        gap: {
          condensed: { $value: '{base.size.8}' },
          spacious: { $value: '{base.size.12}' },
        },
      },
      large: {
        gap: {
          auto: { $value: '{base.size.8}' },
          condensed: { $value: '{base.size.8}' },
          spacious: { $value: '{base.size.12}' },
        },
      },
    },
    overlay: {
      width: {
        xsmall: { $value: '192px', $type: 'dimension' },
        small: { $value: '320px', $type: 'dimension' },
        medium: { $value: '480px', $type: 'dimension' },
        large: { $value: '640px', $type: 'dimension' },
        xlarge: { $value: '960px', $type: 'dimension' },
      },
      height: {
        small: { $value: '256px', $type: 'dimension' },
        medium: { $value: '320px', $type: 'dimension' },
        large: { $value: '432px', $type: 'dimension' },
        xlarge: { $value: '600px', $type: 'dimension' },
      },
      padding: {
        normal: { $value: '{base.size.16}' },
        condensed: { $value: '{base.size.8}' },
      },
      paddingBlock: {
        condensed: { $value: '{base.size.4}' },
        normal: { $value: '{base.size.12}' },
      },
      borderRadius: { $value: '{borderRadius.medium}' },
      offset: { $value: '4px', $type: 'dimension' },
    },
  }),
  'functional/size/size-coarse.tokens.json': JSON.stringify({
    control: {
      minTarget: {
        auto: { $value: '{base.size.44}' },
      },
    },
    controlStack: {
      small: {
        gap: { auto: { $value: '{base.size.16}' } },
      },
      medium: {
        gap: { auto: { $value: '{base.size.12}' } },
      },
    },
  }),
  'functional/size/size-fine.tokens.json': JSON.stringify({
    control: {
      minTarget: {
        auto: { $value: '{base.size.16}' },
      },
    },
    controlStack: {
      small: {
        gap: {
          auto: { $value: '{base.size.8}' },
        },
      },
      medium: {
        gap: { auto: { $value: '{base.size.8}' } },
      },
    },
  }),
  'functional/size/viewport.tokens.json': JSON.stringify({
    viewportRange: {
      narrow: {
        $value: '(max-width: calc({breakpoint.medium} - 0.02px))',
        $type: 'custom-viewportRange',
      },
      narrowLandscape: {
        $value:
          '(max-width: calc({breakpoint.large} - 0.02px) and (max-height: calc({breakpoint.small} - 0.02px)) and (orientation: landscape))',
        $type: 'custom-viewportRange',
      },
      regular: {
        $value: '(min-width: {breakpoint.medium})',
        $type: 'custom-viewportRange',
      },
      wide: {
        $value: '(min-width: {breakpoint.xxlarge})',
        $type: 'custom-viewportRange',
      },
      portrait: {
        $value: '(orientation: portrait)',
        $type: 'custom-viewportRange',
      },
      landscape: {
        $value: '(orientation: landscape)',
        $type: 'custom-viewportRange',
      },
    },
  }),
  'functional/typography/typography.tokens.json': JSON.stringify({
    fontStack: {
      system: {
        $value:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
        $type: 'fontFamily',
      },
      sansSerif: {
        $value:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
        $type: 'fontFamily',
      },
      sansSerifDisplay: {
        $value:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
        $type: 'fontFamily',
      },
      monospace: {
        $value:
          'ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace',
        $type: 'fontFamily',
      },
    },
    text: {
      display: {
        lineBoxHeight: { $value: 1.4, $type: 'number' },
        size: { $value: '40px', $type: 'dimension' },
        lineHeight: { $value: 1.4, $type: 'number' },
        weight: { $value: '{base.text.weight.medium}' },
        shorthand: {
          $value: {
            fontWeight: '{text.display.weight}',
            fontSize: '{text.display.size}',
            lineHeight: '{text.display.lineHeight}',
            fontFamily: '{fontStack.sansSerifDisplay}',
          },
          $type: 'typography',
          $description:
            'Hero-style text for brand to product transition pages. Utilize Title (large) styles on narrow viewports.',
        },
      },
      title: {
        size: {
          large: { $value: '32px', $type: 'dimension' },
          medium: { $value: '20px', $type: 'dimension' },
          small: { $value: '16px', $type: 'dimension' },
        },
        lineHeight: {
          large: { $value: 1.5, $type: 'number' },
          medium: { $value: 1.6, $type: 'number' },
          small: { $value: 1.5, $type: 'number' },
        },
        weight: {
          large: { $value: '{base.text.weight.semibold}' },
          medium: {
            $value: '{base.text.weight.semibold}',
            $type: 'fontWeight',
          },
          small: { $value: '{base.text.weight.semibold}' },
        },
        shorthand: {
          large: {
            $value: {
              fontWeight: '{text.title.weight.large}',
              fontSize: '{text.title.size.large}',
              lineHeight: '{text.title.lineHeight.large}',
              fontFamily: '{fontStack.sansSerifDisplay}',
            },
            $type: 'typography',
            $description:
              'Page headings for user-created objects, such as issues or pull requests. Utilize title (medium) styles on narrow viewports.',
          },
          medium: {
            $value: {
              fontWeight: '{text.title.weight.medium}',
              fontSize: '{text.title.size.medium}',
              lineHeight: '{text.title.lineHeight.medium}',
              fontFamily: '{fontStack.sansSerifDisplay}',
            },
            $type: 'typography',
            $description:
              'Default page title. The 32px-equivalent line-height matches with button and other medium control heights. Great for page header composition.',
          },
          small: {
            $value: {
              fontWeight: '{text.title.weight.small}',
              fontSize: '{text.title.size.small}',
              lineHeight: '{text.title.lineHeight.small}',
              fontFamily: '{fontStack.sansSerif}',
            },
            $type: 'typography',
            $description:
              'Uses the same size as body (large) with a heavier weight of semibold (600).',
          },
        },
      },
      subtitle: {
        size: { $value: '20px', $type: 'dimension' },
        lineHeight: { $value: 1.6, $type: 'number' },
        weight: { $value: '{base.text.weight.normal}' },
        shorthand: {
          $value: {
            fontWeight: '{text.subtitle.weight}',
            fontSize: '{text.subtitle.size}',
            lineHeight: '{text.subtitle.lineHeight}',
            fontFamily: '{fontStack.sansSerifDisplay}',
          },
          $type: 'typography',
          $description:
            'Page sections/sub headings, or less important object names in page titles (automated action titles, for example). Same line-height as title (medium).',
        },
      },
      body: {
        size: {
          large: { $value: '16px', $type: 'dimension' },
          medium: { $value: '14px', $type: 'dimension' },
          small: { $value: '12px', $type: 'dimension' },
        },
        lineHeight: {
          large: { $value: 1.5, $type: 'number' },
          medium: { $value: 1.4285, $type: 'number' },
          small: { $value: 1.6666, $type: 'number' },
        },
        weight: { $value: '{base.text.weight.normal}' },
        shorthand: {
          large: {
            $value: {
              fontWeight: '{text.body.weight}',
              fontSize: '{text.body.size.large}',
              lineHeight: '{text.body.lineHeight.large}',
              fontFamily: '{fontStack.sansSerif}',
            },
            $type: 'typography',
            $description: 'User-generated content, markdown rendering.',
          },
          medium: {
            $value: {
              fontWeight: '{text.body.weight}',
              fontSize: '{text.body.size.medium}',
              lineHeight: '{text.body.lineHeight.medium}',
              fontFamily: '{fontStack.sansSerif}',
            },
            $type: 'typography',
            $description: 'Default UI font. Most commonly used for body text.',
          },
          small: {
            $value: {
              fontWeight: '{text.body.weight}',
              fontSize: '{text.body.size.small}',
              lineHeight: '{text.body.lineHeight.small}',
              fontFamily: '{fontStack.sansSerif}',
            },
            $type: 'typography',
            $description:
              'Small body text for discrete UI applications, such as helper, footnote text. Should be used sparingly across pages. Line-height matches Body (medium) at 20px.',
          },
        },
      },
      caption: {
        size: {
          $value: '12px',
          $type: 'dimension',
        },
        lineHeight: {
          $value: 1.3333,
          $type: 'number',
        },
        weight: {
          $value: '{base.text.weight.normal}',
          $type: 'fontWeight',
        },
        shorthand: {
          $value: {
            fontWeight: '{text.caption.weight}',
            fontSize: '{text.caption.size}',
            lineHeight: '{text.caption.lineHeight}',
            fontFamily: '{fontStack.sansSerif}',
          },
          $type: 'typography',
          $description:
            'Compact small font with a smaller line height of 16px. Use it for single-line scenarios, as the small sizing doesn’t pass accessibility requirements.',
        },
      },
      codeBlock: {
        size: {
          $value: '13px',
          $type: 'dimension',
        },
        lineHeight: {
          $value: 1.5385,
          $type: 'number',
        },
        weight: {
          $value: '{base.text.weight.normal}',
          $type: 'fontWeight',
        },
        shorthand: {
          $value: {
            fontWeight: '{text.codeBlock.weight}',
            fontSize: '{text.codeBlock.size}',
            lineHeight: '{text.codeBlock.lineHeight}',
            fontFamily: '{fontStack.monospace}',
          },
          $type: 'typography',
          $description: 'Default style for rendering code blocks.',
        },
      },
      codeInline: {
        size: {
          $value: '0.9285em',
          $type: 'dimension',
        },
        weight: {
          $value: '{base.text.weight.normal}',
          $type: 'fontWeight',
        },
        shorthand: {
          $value: {
            fontWeight: '{text.codeInline.weight}',
            fontSize: '{text.codeInline.size}',
            fontFamily: '{fontStack.monospace}',
          },
          $type: 'typography',
          $description:
            'Inline code blocks using em units to inherit size from its parent.',
        },
      },
    },
  }),
};
