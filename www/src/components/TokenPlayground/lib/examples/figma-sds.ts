// MIT License

// Copyright (c) 2024 Figma

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
  'sds.resolver.json': JSON.stringify({
    name: 'Figma SDS',
    description: 'Simple Design System',
    version: '2025.10',
    resolutionOrder: [{ $ref: '#/sets/base' }, { $ref: '#/modifiers/theme' }],
    sets: {
      base: {
        sources: [
          { $ref: 'base/color.tokens.json' },
          { $ref: 'base/size.tokens.json' },
          { $ref: 'base/typography.tokens.json' },
        ],
      },
    },
    modifiers: {
      theme: {
        contexts: {
          light: [{ $ref: 'theme/light.tokens.json' }],
          dark: [{ $ref: 'theme/dark.tokens.json' }],
        },
      },
    },
  }),
  'base/color.tokens.json': JSON.stringify({
    color: {
      $type: 'color',
      black: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.050980392156862744,
            hex: '#0c0c0d',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.10196078431372549,
            hex: '#0c0c0d',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.2,
            hex: '#0c0c0d',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.4,
            hex: '#0c0c0d',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.6980392156862745,
            hex: '#0c0c0d',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.8,
            hex: '#0c0c0d',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.8509803921568627,
            hex: '#0c0c0d',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.8980392156862745,
            hex: '#0c0c0d',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 0.9490196078431372,
            hex: '#0c0c0d',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.047058823529411764, 0.047058823529411764, 0.050980392156862744,
            ],
            alpha: 1,
            hex: '#0c0c0d',
          },
        },
      },
      brand: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9607843137254902, 0.9607843137254902, 0.9607843137254902,
            ],
            alpha: 1,
            hex: '#f5f5f5',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9019607843137255, 0.9019607843137255, 0.9019607843137255,
            ],
            alpha: 1,
            hex: '#e6e6e6',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.8509803921568627, 0.8509803921568627, 0.8509803921568627,
            ],
            alpha: 1,
            hex: '#d9d9d9',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.7019607843137254, 0.7019607843137254, 0.7019607843137254,
            ],
            alpha: 1,
            hex: '#b3b3b3',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.4588235294117647, 0.4588235294117647, 0.4588235294117647,
            ],
            alpha: 1,
            hex: '#757575',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.26666666666666666, 0.26666666666666666, 0.26666666666666666,
            ],
            alpha: 1,
            hex: '#444444',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.2196078431372549, 0.2196078431372549, 0.2196078431372549,
            ],
            alpha: 1,
            hex: '#383838',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.17254901960784313, 0.17254901960784313, 0.17254901960784313,
            ],
            alpha: 1,
            hex: '#2c2c2c',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.11764705882352941, 0.11764705882352941, 0.11764705882352941,
            ],
            alpha: 1,
            hex: '#1e1e1e',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.06666666666666667, 0.06666666666666667, 0.06666666666666667,
            ],
            alpha: 1,
            hex: '#111111',
          },
        },
      },
      gray: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9607843137254902, 0.9607843137254902, 0.9607843137254902,
            ],
            alpha: 1,
            hex: '#f5f5f5',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9019607843137255, 0.9019607843137255, 0.9019607843137255,
            ],
            alpha: 1,
            hex: '#e6e6e6',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.8509803921568627, 0.8509803921568627, 0.8509803921568627,
            ],
            alpha: 1,
            hex: '#d9d9d9',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.7019607843137254, 0.7019607843137254, 0.7019607843137254,
            ],
            alpha: 1,
            hex: '#b3b3b3',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.4588235294117647, 0.4588235294117647, 0.4588235294117647,
            ],
            alpha: 1,
            hex: '#757575',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.26666666666666666, 0.26666666666666666, 0.26666666666666666,
            ],
            alpha: 1,
            hex: '#444444',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.2196078431372549, 0.2196078431372549, 0.2196078431372549,
            ],
            alpha: 1,
            hex: '#383838',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.17254901960784313, 0.17254901960784313, 0.17254901960784313,
            ],
            alpha: 1,
            hex: '#2c2c2c',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.11764705882352941, 0.11764705882352941, 0.11764705882352941,
            ],
            alpha: 1,
            hex: '#1e1e1e',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.06666666666666667, 0.06666666666666667, 0.06666666666666667,
            ],
            alpha: 1,
            hex: '#111111',
          },
        },
      },
      green: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [0.9215686274509803, 1, 0.9333333333333333],
            alpha: 1,
            hex: '#ebffee',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.8117647058823529, 0.9686274509803922, 0.8274509803921568,
            ],
            alpha: 1,
            hex: '#cff7d3',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.6862745098039216, 0.9568627450980393, 0.7764705882352941,
            ],
            alpha: 1,
            hex: '#aff4c6',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.5215686274509804, 0.8784313725490196, 0.6392156862745098,
            ],
            alpha: 1,
            hex: '#85e0a3',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.0784313725490196, 0.6823529411764706, 0.3607843137254902,
            ],
            alpha: 1,
            hex: '#14ae5c',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [0, 0.6, 0.3176470588235294],
            alpha: 1,
            hex: '#009951',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [0, 0.5019607843137255, 0.2627450980392157],
            alpha: 1,
            hex: '#008043',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.00784313725490196, 0.32941176470588235, 0.17647058823529413,
            ],
            alpha: 1,
            hex: '#02542d',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.00784313725490196, 0.25098039215686274, 0.13725490196078433,
            ],
            alpha: 1,
            hex: '#024023',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.023529411764705882, 0.17647058823529413, 0.10588235294117647,
            ],
            alpha: 1,
            hex: '#062d1b',
          },
        },
      },
      pink: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9882352941176471, 0.9450980392156862, 0.9921568627450981,
            ],
            alpha: 1,
            hex: '#fcf1fd',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9803921568627451, 0.8823529411764706, 0.9803921568627451,
            ],
            alpha: 1,
            hex: '#fae1fa',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9607843137254902, 0.7529411764705882, 0.9372549019607843,
            ],
            alpha: 1,
            hex: '#f5c0ef',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9450980392156862, 0.6196078431372549, 0.8627450980392157,
            ],
            alpha: 1,
            hex: '#f19edc',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9176470588235294, 0.24705882352941178, 0.7215686274509804,
            ],
            alpha: 1,
            hex: '#ea3fb8',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.8431372549019608, 0.19607843137254902, 0.6588235294117647,
            ],
            alpha: 1,
            hex: '#d732a8',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.7294117647058823, 0.16470588235294117, 0.5725490196078431,
            ],
            alpha: 1,
            hex: '#ba2a92',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.5411764705882353, 0.13333333333333333, 0.43529411764705883,
            ],
            alpha: 1,
            hex: '#8a226f',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.3411764705882353, 0.09411764705882353, 0.2901960784313726,
            ],
            alpha: 1,
            hex: '#57184a',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.24705882352941178, 0.08235294117647059, 0.21176470588235294,
            ],
            alpha: 1,
            hex: '#3f1536',
          },
        },
      },
      red: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.996078431372549, 0.9137254901960784, 0.9058823529411765,
            ],
            alpha: 1,
            hex: '#fee9e7',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9921568627450981, 0.8274509803921568, 0.8156862745098039,
            ],
            alpha: 1,
            hex: '#fdd3d0',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9882352941176471, 0.7019607843137254, 0.6784313725490196,
            ],
            alpha: 1,
            hex: '#fcb3ad',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9568627450980393, 0.4666666666666667, 0.41568627450980394,
            ],
            alpha: 1,
            hex: '#f4776a',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9254901960784314, 0.13333333333333333, 0.12156862745098039,
            ],
            alpha: 1,
            hex: '#ec221f',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.7529411764705882, 0.058823529411764705, 0.047058823529411764,
            ],
            alpha: 1,
            hex: '#c00f0c',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.5647058823529412, 0.043137254901960784, 0.03529411764705882,
            ],
            alpha: 1,
            hex: '#900b09',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.4117647058823529, 0.03137254901960784, 0.027450980392156862,
            ],
            alpha: 1,
            hex: '#690807',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.30196078431372547, 0.043137254901960784, 0.0392156862745098,
            ],
            alpha: 1,
            hex: '#4d0b0a',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.18823529411764706, 0.023529411764705882, 0.011764705882352941,
            ],
            alpha: 1,
            hex: '#300603',
          },
        },
      },
      slate: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9529411764705882, 0.9529411764705882, 0.9529411764705882,
            ],
            alpha: 1,
            hex: '#f3f3f3',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.8901960784313725, 0.8901960784313725, 0.8901960784313725,
            ],
            alpha: 1,
            hex: '#e3e3e3',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.803921568627451, 0.803921568627451, 0.803921568627451,
            ],
            alpha: 1,
            hex: '#cdcdcd',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.6980392156862745, 0.6980392156862745, 0.6980392156862745,
            ],
            alpha: 1,
            hex: '#b2b2b2',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.5803921568627451, 0.5803921568627451, 0.5803921568627451,
            ],
            alpha: 1,
            hex: '#949494',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.4627450980392157, 0.4627450980392157, 0.4627450980392157,
            ],
            alpha: 1,
            hex: '#767676',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.35294117647058826, 0.35294117647058826, 0.35294117647058826,
            ],
            alpha: 1,
            hex: '#5a5a5a',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.2627450980392157, 0.2627450980392157, 0.2627450980392157,
            ],
            alpha: 1,
            hex: '#434343',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.18823529411764706, 0.18823529411764706, 0.18823529411764706,
            ],
            alpha: 1,
            hex: '#303030',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.1411764705882353, 0.1411764705882353, 0.1411764705882353,
            ],
            alpha: 1,
            hex: '#242424',
          },
        },
      },
      white: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.050980392156862744,
            hex: '#ffffff',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.10196078431372549,
            hex: '#ffffff',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.2,
            hex: '#ffffff',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.4,
            hex: '#ffffff',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.6980392156862745,
            hex: '#ffffff',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.8,
            hex: '#ffffff',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.8509803921568627,
            hex: '#ffffff',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.8980392156862745,
            hex: '#ffffff',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 0.9490196078431372,
            hex: '#ffffff',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 1, 1],
            alpha: 1,
            hex: '#ffffff',
          },
        },
      },
      yellow: {
        '100': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 0.984313725490196, 0.9215686274509803],
            alpha: 1,
            hex: '#fffbeb',
          },
        },
        '200': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 0.9450980392156862, 0.7607843137254902],
            alpha: 1,
            hex: '#fff1c2',
          },
        },
        '300': {
          $value: {
            colorSpace: 'srgb',
            components: [1, 0.9098039215686274, 0.6392156862745098],
            alpha: 1,
            hex: '#ffe8a3',
          },
        },
        '400': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.9098039215686274, 0.7254901960784313, 0.19215686274509805,
            ],
            alpha: 1,
            hex: '#e8b931',
          },
        },
        '500': {
          $value: {
            colorSpace: 'srgb',
            components: [0.8980392156862745, 0.6274509803921569, 0],
            alpha: 1,
            hex: '#e5a000',
          },
        },
        '600': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.7490196078431373, 0.41568627450980394, 0.00784313725490196,
            ],
            alpha: 1,
            hex: '#bf6a02',
          },
        },
        '700': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.592156862745098, 0.3176470588235294, 0.00784313725490196,
            ],
            alpha: 1,
            hex: '#975102',
          },
        },
        '800': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.40784313725490196, 0.17647058823529413, 0.011764705882352941,
            ],
            alpha: 1,
            hex: '#682d03',
          },
        },
        '900': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.3215686274509804, 0.1450980392156863, 0.01568627450980392,
            ],
            alpha: 1,
            hex: '#522504',
          },
        },
        '1000': {
          $value: {
            colorSpace: 'srgb',
            components: [
              0.25098039215686274, 0.10588235294117647, 0.00392156862745098,
            ],
            alpha: 1,
            hex: '#401b01',
          },
        },
      },
    },
  }),
  'base/size.tokens.json': JSON.stringify({
    size: {
      $type: 'dimension',
      blur: {
        '100': { $value: { value: 0.25, unit: 'rem' } },
      },
      depth: {
        '0': { $value: { value: 0, unit: 'rem' } },
        '025': { $value: { value: 0.0625, unit: 'rem' } },
        '100': { $value: { value: 0.25, unit: 'rem' } },
        '200': { $value: { value: 0.5, unit: 'rem' } },
        '400': { $value: { value: 1, unit: 'rem' } },
        '800': { $value: { value: 2, unit: 'rem' } },
        '1200': { $value: { value: 3, unit: 'rem' } },
        'negative-025': { $value: { value: -0.0625, unit: 'rem' } },
        'negative-100': { $value: { value: -0.25, unit: 'rem' } },
        'negative-200': { $value: { value: -0.5, unit: 'rem' } },
        'negative-400': { $value: { value: -1, unit: 'rem' } },
        'negative-800': { $value: { value: -2, unit: 'rem' } },
        'negative-1200': { $value: { value: -3, unit: 'rem' } },
      },
      icon: {
        small: { $value: { value: 1.5, unit: 'rem' } },
        medium: { $value: { value: 2, unit: 'rem' } },
        large: { $value: { value: 2.5, unit: 'rem' } },
      },
      radius: {
        '100': { $value: { value: 0.25, unit: 'rem' } },
        '200': { $value: { value: 0.5, unit: 'rem' } },
        '400': { $value: { value: 1, unit: 'rem' } },
        full: { $value: { value: 624.9375, unit: 'rem' } },
      },
      space: {
        '0': { $value: { value: 0, unit: 'rem' } },
        '050': { $value: { value: 0.125, unit: 'rem' } },
        '100': { $value: { value: 0.25, unit: 'rem' } },
        '150': { $value: { value: 0.375, unit: 'rem' } },
        '200': { $value: { value: 0.5, unit: 'rem' } },
        '300': { $value: { value: 0.75, unit: 'rem' } },
        '400': { $value: { value: 1, unit: 'rem' } },
        '600': { $value: { value: 1.5, unit: 'rem' } },
        '800': { $value: { value: 2, unit: 'rem' } },
        '1200': { $value: { value: 3, unit: 'rem' } },
        '1600': { $value: { value: 4, unit: 'rem' } },
        '2400': { $value: { value: 6, unit: 'rem' } },
        '4000': { $value: { value: 0, unit: 'rem' } },
        'negative-100': { $value: { value: -0.25, unit: 'rem' } },
        'negative-200': { $value: { value: -0.5, unit: 'rem' } },
        'negative-300': { $value: { value: -0.75, unit: 'rem' } },
        'negative-400': { $value: { value: -1, unit: 'rem' } },
        'negative-600': { $value: { value: -1.5, unit: 'rem' } },
      },
      stroke: {
        border: { $value: { value: 0.0625, unit: 'rem' } },
        'focus-ring': { $value: { value: 0.125, unit: 'rem' } },
      },
    },
  }),
  'base/typography.tokens.json': JSON.stringify({
    typography: {
      $type: 'typography',
      titleHero: {
        $value: {
          fontFamily: '{typography.family.sans}',
          fontSize: '{typography.scale.10}',
          fontWeight: '{typography.weight.bold}',
        },
      },
      titlePage: {
        small: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.07}',
            fontWeight: '{typography.weight.bold}',
          },
        },
        base: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.08}',
            fontWeight: '{typography.weight.bold}',
          },
        },
        large: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.09}',
            fontWeight: '{typography.weight.bold}',
          },
        },
      },
      subtitle: {
        small: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.05}',
            fontWeight: '{typography.weight.regular}',
          },
        },
        base: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.06}',
            fontWeight: '{typography.weight.regular}',
          },
        },
        large: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.07}',
            fontWeight: '{typography.weight.regular}',
          },
        },
      },
      heading: {
        small: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.04}',
            fontWeight: '{typography.weight.semibold}',
          },
        },
        base: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.05}',
            fontWeight: '{typography.weight.semibold}',
          },
        },
        large: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.06}',
            fontWeight: '{typography.weight.semibold}',
          },
        },
      },
      subheading: {
        small: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.03}',
            fontWeight: '{typography.weight.regular}',
          },
        },
        base: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.04}',
            fontWeight: '{typography.weight.regular}',
          },
        },
        large: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.05}',
            fontWeight: '{typography.weight.regular}',
          },
        },
      },
      body: {
        small: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.02}',
            fontWeight: '{typography.weight.regular}',
          },
        },
        medium: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.03}',
            fontWeight: '{typography.weight.regular}',
          },
        },
        large: {
          $value: {
            fontFamily: '{typography.family.sans}',
            fontSize: '{typography.scale.04}',
            fontWeight: '{typography.weight.regular}',
          },
        },
      },
      code: {
        small: {
          $value: {
            fontFamily: '{typography.family.mono}',
            fontSize: '{typography.scale.02}',
            fontWeight: '{typography.weight.regular}',
          },
        },
        medium: {
          $value: {
            fontFamily: '{typography.family.mono}',
            fontSize: '{typography.scale.03}',
            fontWeight: '{typography.weight.regular}',
          },
        },
        large: {
          $value: {
            fontFamily: '{typography.family.mono}',
            fontSize: '{typography.scale.04}',
            fontWeight: '{typography.weight.regular}',
          },
        },
      },
      family: {
        $type: 'fontFamily',
        mono: { $value: ['roboto mono', 'monospace'] },
        sans: { $value: ['inter', 'sans-serif'] },
        serif: { $value: ['noto serif', 'serif'] },
      },
      scale: {
        $type: 'dimension',
        '01': { $value: { value: 0.75, unit: 'rem' } },
        '02': { $value: { value: 0.875, unit: 'rem' } },
        '03': { $value: { value: 1, unit: 'rem' } },
        '04': { $value: { value: 1.25, unit: 'rem' } },
        '05': { $value: { value: 1.5, unit: 'rem' } },
        '06': { $value: { value: 2, unit: 'rem' } },
        '07': { $value: { value: 2.5, unit: 'rem' } },
        '08': { $value: { value: 3, unit: 'rem' } },
        '09': { $value: { value: 4, unit: 'rem' } },
        '10': { $value: { value: 4.5, unit: 'rem' } },
      },
      weight: {
        $type: 'fontWeight',
        thin: { $value: 100 },
        extralight: { $value: 200 },
        light: { $value: 300 },
        regular: { $value: 400 },
        medium: { $value: 500 },
        semibold: { $value: 600 },
        bold: { $value: 700 },
        extrabold: { $value: 800 },
        black: { $value: 900 },
      },
    },
  }),
  'theme/light.tokens.json': JSON.stringify({
    color: {
      background: {
        brand: {
          default: { $value: '{color.brand.800}' },
          hover: { $value: '{color.brand.900}' },
          secondary: { $value: '{color.brand.200}' },
          'secondary-hover': { $value: '{color.brand.300}' },
          tertiary: { $value: '{color.brand.100}' },
          'tertiary-hover': { $value: '{color.brand.200}' },
        },
        danger: {
          default: { $value: '{color.red.500}' },
          hover: { $value: '{color.red.600}' },
          secondary: { $value: '{color.red.200}' },
          'secondary-hover': { $value: '{color.red.300}' },
          tertiary: { $value: '{color.red.100}' },
          'tertiary-hover': { $value: '{color.red.200}' },
        },
        default: {
          default: { $value: '{color.white.1000}' },
          hover: { $value: '{color.gray.100}' },
          secondary: { $value: '{color.gray.100}' },
          'secondary-hover': { $value: '{color.gray.200}' },
          tertiary: { $value: '{color.gray.300}' },
          'tertiary-hover': { $value: '{color.gray.400}' },
        },
        disabled: {
          default: { $value: '{color.brand.300}' },
        },
        neutral: {
          default: { $value: '{color.slate.700}' },
          hover: { $value: '{color.slate.800}' },
          secondary: { $value: '{color.slate.300}' },
          'secondary-hover': { $value: '{color.slate.400}' },
          tertiary: { $value: '{color.slate.200}' },
          'tertiary-hover': { $value: '{color.slate.300}' },
        },
        positive: {
          default: { $value: '{color.green.500}' },
          hover: { $value: '{color.green.600}' },
          secondary: { $value: '{color.green.200}' },
          'secondary-hover': { $value: '{color.green.300}' },
          tertiary: { $value: '{color.green.100}' },
          'tertiary-hover': { $value: '{color.green.200}' },
        },
        warning: {
          default: { $value: '{color.yellow.400}' },
          hover: { $value: '{color.yellow.500}' },
          secondary: { $value: '{color.yellow.200}' },
          'secondary-hover': { $value: '{color.yellow.300}' },
          tertiary: { $value: '{color.yellow.100}' },
          'tertiary-hover': { $value: '{color.yellow.200}' },
        },
      },
      border: {
        brand: {
          default: { $value: '{color.brand.800}' },
          secondary: { $value: '{color.brand.600}' },
          tertiary: { $value: '{color.brand.500}' },
        },
        danger: {
          default: { $value: '{color.red.700}' },
          secondary: { $value: '{color.red.600}' },
          tertiary: { $value: '{color.red.500}' },
        },
        default: {
          default: { $value: '{color.gray.300}' },
          secondary: { $value: '{color.gray.500}' },
          tertiary: { $value: '{color.gray.700}' },
        },
        disabled: {
          default: { $value: '{color.brand.400}' },
        },
        neutral: {
          default: { $value: '{color.slate.900}' },
          secondary: { $value: '{color.slate.600}' },
          tertiary: { $value: '{color.slate.400}' },
        },
        positive: {
          default: { $value: '{color.green.800}' },
          secondary: { $value: '{color.green.600}' },
          tertiary: { $value: '{color.green.500}' },
        },
        warning: {
          default: { $value: '{color.yellow.900}' },
          secondary: { $value: '{color.yellow.700}' },
          tertiary: { $value: '{color.yellow.600}' },
        },
      },
      icon: {
        brand: {
          default: { $value: '{color.brand.800}' },
          secondary: { $value: '{color.brand.600}' },
          tertiary: { $value: '{color.brand.500}' },
          'on-brand': { $value: '{color.brand.100}' },
          'on-brand-secondary': { $value: '{color.brand.900}' },
          'on-brand-tertiary': { $value: '{color.brand.800}' },
        },
        danger: {
          default: { $value: '{color.red.700}' },
          secondary: { $value: '{color.red.600}' },
          tertiary: { $value: '{color.red.500}' },
          'on-danger': { $value: '{color.red.100}' },
          'on-danger-secondary': { $value: '{color.red.700}' },
          'on-danger-tertiary': { $value: '{color.red.700}' },
        },
        default: {
          default: { $value: '{color.gray.900}' },
          secondary: { $value: '{color.gray.500}' },
          tertiary: { $value: '{color.gray.400}' },
        },
        disabled: {
          default: { $value: '{color.brand.400}' },
          'on-disabled': { $value: '{color.brand.400}' },
        },
        neutral: {
          default: { $value: '{color.slate.900}' },
          secondary: { $value: '{color.slate.700}' },
          tertiary: { $value: '{color.slate.600}' },
          'on-neutral': { $value: '{color.slate.100}' },
          'on-neutral-secondary': { $value: '{color.slate.900}' },
          'on-neutral-tertiary': { $value: '{color.slate.800}' },
        },
        positive: {
          default: { $value: '{color.green.800}' },
          secondary: { $value: '{color.green.600}' },
          tertiary: { $value: '{color.green.500}' },
          'on-positive': { $value: '{color.green.100}' },
          'on-positive-secondary': { $value: '{color.green.800}' },
          'on-positive-tertiary': { $value: '{color.green.500}' },
        },
        warning: {
          default: { $value: '{color.yellow.900}' },
          secondary: { $value: '{color.yellow.700}' },
          tertiary: { $value: '{color.yellow.600}' },
          'on-warning': { $value: '{color.yellow.1000}' },
          'on-warning-secondary': { $value: '{color.yellow.800}' },
          'on-warning-tertiary': { $value: '{color.yellow.900}' },
        },
      },
      text: {
        brand: {
          default: { $value: '{color.brand.800}' },
          secondary: { $value: '{color.brand.600}' },
          tertiary: { $value: '{color.brand.500}' },
          'on-brand': { $value: '{color.brand.100}' },
          'on-brand-secondary': { $value: '{color.brand.900}' },
          'on-brand-tertiary': { $value: '{color.brand.800}' },
        },
        danger: {
          default: { $value: '{color.red.700}' },
          secondary: { $value: '{color.red.600}' },
          tertiary: { $value: '{color.red.500}' },
          'on-danger': { $value: '{color.red.100}' },
          'on-danger-secondary': { $value: '{color.red.700}' },
          'on-danger-tertiary': { $value: '{color.red.700}' },
        },
        default: {
          default: { $value: '{color.gray.900}' },
          secondary: { $value: '{color.gray.500}' },
          tertiary: { $value: '{color.gray.400}' },
        },
        disabled: {
          default: { $value: '{color.brand.400}' },
          'on-disabled': { $value: '{color.brand.400}' },
        },
        neutral: {
          default: { $value: '{color.slate.900}' },
          'on-neutral': { $value: '{color.slate.100}' },
          'on-neutral-secondary': { $value: '{color.slate.900}' },
          'on-neutral-tertiary': { $value: '{color.slate.800}' },
          secondary: { $value: '{color.slate.700}' },
          tertiary: { $value: '{color.slate.600}' },
        },
        positive: {
          default: { $value: '{color.green.800}' },
          secondary: { $value: '{color.green.600}' },
          tertiary: { $value: '{color.green.500}' },
          'on-positive': { $value: '{color.green.100}' },
          'on-positive-secondary': { $value: '{color.green.800}' },
          'on-positive-tertiary': { $value: '{color.green.800}' },
        },
        warning: {
          default: { $value: '{color.yellow.900}' },
          secondary: { $value: '{color.yellow.700}' },
          tertiary: { $value: '{color.yellow.600}' },
          'on-warning': { $value: '{color.yellow.1000}' },
          'on-warning-secondary': { $value: '{color.yellow.800}' },
          'on-warning-tertiary': { $value: '{color.yellow.900}' },
        },
      },
    },
  }),
  'theme/dark.tokens.json': JSON.stringify({
    color: {
      background: {
        brand: {
          default: { $value: '{color.white.100}' },
          hover: { $value: '{color.brand.300}' },
          secondary: { $value: '{color.brand.600}' },
          'secondary-hover': { $value: '{color.brand.500}' },
          tertiary: { $value: '{color.brand.600}' },
          'tertiary-hover': { $value: '{color.brand.800}' },
        },
        danger: {
          default: { $value: '{color.red.600}' },
          hover: { $value: '{color.red.700}' },
          secondary: { $value: '{color.red.800}' },
          'secondary-hover': { $value: '{color.red.900}' },
          tertiary: { $value: '{color.red.900}' },
          'tertiary-hover': { $value: '{color.red.1000}' },
        },
        default: {
          default: { $value: '{color.gray.900}' },
          hover: { $value: '{color.gray.700}' },
          secondary: { $value: '{color.gray.800}' },
          'secondary-hover': { $value: '{color.gray.900}' },
          tertiary: { $value: '{color.gray.600}' },
          'tertiary-hover': { $value: '{color.gray.700}' },
        },
        disabled: {
          default: { $value: '{color.brand.700}' },
        },
        neutral: {
          default: { $value: '{color.slate.400}' },
          hover: { $value: '{color.slate.500}' },
          secondary: { $value: '{color.slate.900}' },
          'secondary-hover': { $value: '{color.slate.1000}' },
          tertiary: { $value: '{color.slate.900}' },
          'tertiary-hover': { $value: '{color.slate.1000}' },
        },
        positive: {
          default: { $value: '{color.green.700}' },
          hover: { $value: '{color.green.800}' },
          secondary: { $value: '{color.green.800}' },
          'secondary-hover': { $value: '{color.green.900}' },
          tertiary: { $value: '{color.green.900}' },
          'tertiary-hover': { $value: '{color.green.1000}' },
        },
        warning: {
          default: { $value: '{color.yellow.400}' },
          hover: { $value: '{color.yellow.500}' },
          secondary: { $value: '{color.yellow.800}' },
          'secondary-hover': { $value: '{color.yellow.900}' },
          tertiary: { $value: '{color.yellow.900}' },
          'tertiary-hover': { $value: '{color.yellow.1000}' },
        },
      },
      border: {
        brand: {
          default: { $value: '{color.brand.100}' },
          secondary: { $value: '{color.brand.300}' },
          tertiary: { $value: '{color.brand.400}' },
        },
        danger: {
          default: { $value: '{color.red.200}' },
          secondary: { $value: '{color.red.400}' },
          tertiary: { $value: '{color.red.500}' },
        },
        default: {
          default: { $value: '{color.gray.600}' },
          secondary: { $value: '{color.gray.500}' },
          tertiary: { $value: '{color.gray.400}' },
        },
        disabled: {
          default: { $value: '{color.brand.600}' },
        },
        neutral: {
          default: { $value: '{color.slate.100}' },
          secondary: { $value: '{color.slate.500}' },
          tertiary: { $value: '{color.slate.600}' },
        },
        positive: {
          default: { $value: '{color.green.200}' },
          secondary: { $value: '{color.green.400}' },
          tertiary: { $value: '{color.green.600}' },
        },
        warning: {
          default: { $value: '{color.yellow.200}' },
          secondary: { $value: '{color.yellow.400}' },
          tertiary: { $value: '{color.yellow.600}' },
        },
      },
      icon: {
        brand: {
          default: { $value: '{color.brand.100}' },
          secondary: { $value: '{color.brand.300}' },
          tertiary: { $value: '{color.brand.400}' },
          'on-brand': { $value: '{color.brand.900}' },
          'on-brand-secondary': { $value: '{color.brand.100}' },
          'on-brand-tertiary': { $value: '{color.brand.100}' },
        },
        danger: {
          default: { $value: '{color.red.200}' },
          secondary: { $value: '{color.red.400}' },
          tertiary: { $value: '{color.red.500}' },
          'on-danger': { $value: '{color.red.100}' },
          'on-danger-secondary': { $value: '{color.red.100}' },
          'on-danger-tertiary': { $value: '{color.red.100}' },
        },
        default: {
          default: { $value: '{color.white.1000}' },
          secondary: { $value: '{color.white.500}' },
          tertiary: { $value: '{color.white.400}' },
        },
        disabled: {
          default: { $value: '{color.brand.500}' },
          'on-disabled': { $value: '{color.brand.400}' },
        },
        neutral: {
          default: { $value: '{color.slate.200}' },
          secondary: { $value: '{color.slate.300}' },
          tertiary: { $value: '{color.slate.400}' },
          'on-neutral': { $value: '{color.slate.1000}' },
          'on-neutral-secondary': { $value: '{color.slate.100}' },
          'on-neutral-tertiary': { $value: '{color.slate.100}' },
        },
        positive: {
          default: { $value: '{color.green.200}' },
          secondary: { $value: '{color.green.400}' },
          tertiary: { $value: '{color.green.600}' },
          'on-positive': { $value: '{color.green.100}' },
          'on-positive-secondary': { $value: '{color.green.100}' },
          'on-positive-tertiary': { $value: '{color.green.100}' },
        },
        warning: {
          default: { $value: '{color.yellow.200}' },
          secondary: { $value: '{color.yellow.400}' },
          tertiary: { $value: '{color.yellow.600}' },
          'on-warning': { $value: '{color.yellow.1000}' },
          'on-warning-secondary': { $value: '{color.yellow.100}' },
          'on-warning-tertiary': { $value: '{color.yellow.100}' },
        },
      },
      text: {
        brand: {
          default: { $value: '{color.brand.100}' },
          secondary: { $value: '{color.brand.300}' },
          tertiary: { $value: '{color.brand.400}' },
          'on-brand': { $value: '{color.brand.900}' },
          'on-brand-secondary': { $value: '{color.brand.100}' },
          'on-brand-tertiary': { $value: '{color.brand.100}' },
        },
        danger: {
          default: { $value: '{color.red.200}' },
          secondary: { $value: '{color.red.400}' },
          tertiary: { $value: '{color.red.500}' },
          'on-danger': { $value: '{color.red.100}' },
          'on-danger-secondary': { $value: '{color.red.100}' },
          'on-danger-tertiary': { $value: '{color.red.100}' },
        },
        default: {
          default: { $value: '{color.white.1000}' },
          secondary: { $value: '{color.white.500}' },
          tertiary: { $value: '{color.white.400}' },
        },
        disabled: {
          default: { $value: '{color.brand.500}' },
          'on-disabled': { $value: '{color.brand.400}' },
        },
        neutral: {
          default: { $value: '{color.slate.200}' },
          'on-neutral': { $value: '{color.slate.1000}' },
          'on-neutral-secondary': { $value: '{color.slate.100}' },
          'on-neutral-tertiary': { $value: '{color.slate.100}' },
          secondary: { $value: '{color.slate.300}' },
          tertiary: { $value: '{color.slate.400}' },
        },
        positive: {
          default: { $value: '{color.green.200}' },
          secondary: { $value: '{color.green.400}' },
          tertiary: { $value: '{color.green.600}' },
          'on-positive': { $value: '{color.green.100}' },
          'on-positive-secondary': { $value: '{color.green.100}' },
          'on-positive-tertiary': { $value: '{color.green.100}' },
        },
        warning: {
          default: { $value: '{color.yellow.200}' },
          secondary: { $value: '{color.yellow.400}' },
          tertiary: { $value: '{color.yellow.600}' },
          'on-warning': { $value: '{color.yellow.1000}' },
          'on-warning-secondary': { $value: '{color.yellow.100}' },
          'on-warning-tertiary': { $value: '{color.yellow.100}' },
        },
      },
    },
  }),
};
