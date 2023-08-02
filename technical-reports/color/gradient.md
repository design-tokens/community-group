# Gradient 

Below are instances of implementing various types of gradients:

## Linear

```json
{
  "red-to-blue": {
    "$type": "gradient",
    "$value": {
      "$colorSpace": "sHex",
      "$style": "linear",
      "$angle": "45deg",
      "$colors": [
        {
          "$value": "#b71803",
          "$position": 0,
          "$alpha": 1
        },
        {
          "$value": "#1e03b7",
          "$position": 1,
          "$alpha": 1
        }
      ]
    }
  }
}
```


## Linear using RGB
```json
{
  "red-to-blue": {
    "$type": "gradient",
    "$value": {
      "$colorSpace": "srgb",
      "$style": "linear",
      "$angle": "45deg",
      "$colors": [
        {
          "$value": {
            "$hex": "#b71803", // hex fallback
            "$colorSpace": {
              "$name": "srgb",
              "$components": [183, 24, 3],
              "$alpha": 1
            },
            "$position": 0,
            "$alpha": 1
          }
        },
        {
          "$value": {
            "$hex": "#1e03b7", // hex fallback
            "$colorSpace": {
              "$name": "srgb",
              "$components": [30, 3, 183],
              "$alpha": 1
            },
            "$position": 0,
            "$alpha": 1
          }
        }
      ]
    }
  }
}
```



## Radial

```json
{
  "yellow-glow": {
    "$type": "gradient",
    "$style": "radial",
    "$position": "center",
    "$value": {
      "$colorSpace": "sHex",
      "$colors": [
        {
          "$value": {
              "$hex": "#bbc101",
              "$alpha": 1,
          },
          "$position": 0,
        },
        {
          "$value": {
              "$hex": "#fff",
              "$alpha": 0.75,
          },
          "$position": 1,
        },
      ],
    },
  }
}
```


## Conic

```json
{
  "purple-radial": {
    "$type": "gradient",
    "$style": "conic",
    "$angle": "45deg",
    "$value": {
      "$colorSpace": "sHex",
      "$colors": [
        {
          "$value": "#8300ef",
          "$position": 0,
          "$alpha": 1
        },
        {
          "$value": "#5d04a5",
          "$position": 0.5,
          "$alpha": 1
        },
        {
          "$value": "#310059",
          "$position": 1,
          "$alpha": 1
        },
      ],
    },
  }
}
```