import React, { SVGProps } from 'react'
import {
  Circle,
  getLoopChildCircle,
  getLoopPoint,
  getRotatedLoopPoint,
  getRotatedPoint,
  Point,
  RotatedLoop,
} from '../../../library/circleStuff'
import {
  getCommonalityWave,
  getElementIndices,
  getFilteredRhythm,
  getNaturalRhythm,
} from '../../../library/rhythmStuff'

export default {
  pageRoute: '/graphics/foo',
  PageContent: Foo,
  htmlTitle: 'foo - jmath',
  htmlDescription: 'a foo graphic',
  generatePdf: false,
  pdfFileName: 'foo',
}

const Color = {
  yellow: '#BC9F10',
  orange: '#E57310',
  green: '#101915',
  red: '#a43d42',
}

function Foo() {
  const waveA = getCommonalityWave({
    baseRhythm: getFilteredRhythm({
      rhythmSequence: [
        getNaturalRhythm({
          rhythmResolution: 12,
          rhythmDensity: 11,
          rhythmPhase: 0,
        }),
        getNaturalRhythm({
          rhythmResolution: 11,
          rhythmDensity: 7,
          rhythmPhase: 4,
        }),
      ],
    }),
  })
  const waveB = getCommonalityWave({
    baseRhythm: getFilteredRhythm({
      rhythmSequence: [
        getNaturalRhythm({
          rhythmResolution: 24,
          rhythmDensity: 23,
          rhythmPhase: 0,
        }),
        getNaturalRhythm({
          rhythmResolution: 23,
          rhythmDensity: 11,
          rhythmPhase: 0,
        }),
        getNaturalRhythm({
          rhythmResolution: 11,
          rhythmDensity: 7,
          rhythmPhase: 4,
        }),
      ],
    }),
  })
  const baseCircleA: Circle = {
    radius: 50,
    center: {
      x: 50,
      y: 50,
    },
  }
  const corePattern = waveA
    .map((cellA, indexA) => {
      const angleA = ((2 * Math.PI) / waveA.length) * indexA + Math.PI / 2
      const perimeterPoint = {
        x: baseCircleA.radius * Math.cos(angleA) + baseCircleA.center.x,
        y: baseCircleA.radius * Math.sin(angleA) + baseCircleA.center.y,
      }
      const polyCenterPoint = {
        x:
          -cellA * (baseCircleA.radius / waveA.length) * Math.cos(angleA) +
          perimeterPoint.x,
        y:
          -cellA * (baseCircleA.radius / waveA.length) * Math.sin(angleA) +
          perimeterPoint.y,
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyCenterPoint.x - baseCircleA.center.x,
        polyCenterPoint.y - baseCircleA.center.y
      )
      const polyRotationAngle = polyBaseRelativeAngle + Math.PI / 2
      const someRotatedLoop: RotatedLoop = {
        baseCircle: {
          radius: (baseCircleA.radius / waveA.length / 3) * cellA,
          center: polyCenterPoint,
        },
        childCircle: {
          relativeRadius: 0.675,
          relativeDepth: 0.375,
          phaseAngle: polyBaseRelativeAngle,
        },
        rotationAnchor: 'base',
        rotationAngle: polyRotationAngle,
      }
      return getElementIndices({
        targetValue: true,
        someSpace: getFilteredRhythm({
          rhythmSequence: [
            getNaturalRhythm({
              rhythmResolution: 24,
              rhythmDensity: 23,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 23,
              rhythmDensity: 13,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 13,
              rhythmDensity: cellA + 1,
              rhythmPhase: cellA,
            }),
          ],
        }),
      }).map((rhythmIndex, matchIndex) => {
        return {
          rotatedLoop: getUpdatedData({
            baseData: someRotatedLoop,
            dataUpdates: {
              'baseCircle.radius':
                someRotatedLoop.baseCircle.radius -
                (someRotatedLoop.baseCircle.radius / 24) * rhythmIndex,
            },
          }),
          strokeColor:
            (matchIndex + cellA) % 3 !== 0
              ? (matchIndex + cellA) % 3 !== 1
                ? Color['orange']
                : Color['yellow']
              : Color['red'],
        }
      })
    })
    .flat()
  const rimPattern = waveB
    .map((cellA, indexA) => {
      const angleA = ((2 * Math.PI) / waveB.length) * indexA + Math.PI / 2
      const perimeterPoint = {
        x: baseCircleA.radius * Math.cos(angleA) + baseCircleA.center.x,
        y: baseCircleA.radius * Math.sin(angleA) + baseCircleA.center.y,
      }
      const polyCenterPoint = {
        x:
          (-cellA * (baseCircleA.radius / waveB.length) + cellA) *
            Math.cos(angleA) +
          perimeterPoint.x,
        y:
          (-cellA * (baseCircleA.radius / waveB.length) + cellA) *
            Math.sin(angleA) +
          perimeterPoint.y,
      }
      const polyBaseRelativeAngle = Math.atan2(
        polyCenterPoint.x - baseCircleA.center.x,
        polyCenterPoint.y - baseCircleA.center.y
      )
      const polyRotationAngle = polyBaseRelativeAngle + Math.PI / 2 + Math.PI
      const someRotatedLoop: RotatedLoop = {
        baseCircle: {
          radius: (baseCircleA.radius / waveB.length / 3) * cellA,
          center: polyCenterPoint,
        },
        childCircle: {
          relativeRadius: 7 / 8,
          relativeDepth: 3 / 8,
          phaseAngle: polyBaseRelativeAngle,
        },
        rotationAnchor: 'base',
        rotationAngle: polyRotationAngle,
      }
      return getElementIndices({
        targetValue: true,
        someSpace: getFilteredRhythm({
          rhythmSequence: [
            getNaturalRhythm({
              rhythmResolution: 24,
              rhythmDensity: 23,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 23,
              rhythmDensity: 13,
              rhythmPhase: 0,
            }),
            getNaturalRhythm({
              rhythmResolution: 11,
              rhythmDensity: cellA + 1,
              rhythmPhase: cellA,
            }),
          ],
        }),
      }).map((rhythmIndex, matchIndex) => {
        return {
          rotatedLoop: getUpdatedData({
            baseData: someRotatedLoop,
            dataUpdates: {
              'baseCircle.radius':
                someRotatedLoop.baseCircle.radius -
                (someRotatedLoop.baseCircle.radius / 24) * rhythmIndex,
            },
          }),
          strokeColor:
            (matchIndex + cellA + 2) % 3 !== 0
              ? (matchIndex + cellA + 2) % 3 !== 1
                ? Color['orange']
                : Color['yellow']
              : Color['red'],
        }
      })
    })
    .flat()
  const centerBaseLoop: RotatedLoop = {
    baseCircle: {
      radius: 7,
      center: baseCircleA.center,
    },
    childCircle: {
      relativeRadius: 5 / 8 + 0.05,
      relativeDepth: 5 / 8 + 0.05,
      phaseAngle: Math.PI / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: 0,
  }
  const centerTopLoop: RotatedLoop = {
    baseCircle: {
      radius: 4,
      center: getRotatedLoopPoint({
        someRotatedLoop: {
          ...centerBaseLoop,
          baseCircle: {
            ...centerBaseLoop.baseCircle,
            radius: centerBaseLoop.baseCircle.radius + 20,
          },
        },
        sampleAngle: Math.PI + Math.PI / 2,
      }),
    },
    childCircle: {
      relativeRadius: 3 / 4,
      relativeDepth: 7 / 8,
      phaseAngle: 0,
    },
    rotationAnchor: 'base',
    rotationAngle: -Math.PI / 2,
  }
  const centerTopBaseLoop = getUpdatedData({
    baseData: centerBaseLoop,
    dataUpdates: {
      'baseCircle.radius': (baseCircleRadius: number) => baseCircleRadius + 2,
    },
  })
  const centerRightTopLoop: RotatedLoop = {
    baseCircle: {
      radius: 4,
      center: getRotatedLoopPoint({
        someRotatedLoop: centerTopBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 + Math.PI / 6,
      }),
    },
    childCircle: {
      relativeRadius: 1 / 2,
      relativeDepth: 7 / 8,
      phaseAngle: -Math.PI / 4,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2 + Math.PI / 6,
  }
  const centerLeftTopLoop = getUpdatedData({
    baseData: centerRightTopLoop,
    dataUpdates: {
      'baseCircle.center': getRotatedLoopPoint({
        someRotatedLoop: centerTopBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 - Math.PI / 6,
      }),
      'childCircle.phaseAngle': Math.PI / 4,
      rotationAngle: Math.PI / 2 - Math.PI / 6,
    },
  })
  const centerBottomBaseLoop = getUpdatedData({
    baseData: centerBaseLoop,
    dataUpdates: {
      'baseCircle.radius': (baseCircleRadius: number) => baseCircleRadius + 5,
    },
  })
  const centerRightBottomLoop: RotatedLoop = {
    baseCircle: {
      radius: 4,
      center: getRotatedLoopPoint({
        someRotatedLoop: centerBottomBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 + Math.PI / 1.5,
      }),
    },
    childCircle: {
      relativeRadius: 1 / 2,
      relativeDepth: 7 / 8,
      phaseAngle: Math.PI / 3,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2 + Math.PI / 1.5,
  }
  const centerLeftBottomLoop = getUpdatedData({
    baseData: centerRightTopLoop,
    dataUpdates: {
      'baseCircle.center': getRotatedLoopPoint({
        someRotatedLoop: centerBottomBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 - Math.PI / 1.5,
      }),
      'childCircle.phaseAngle': -Math.PI / 3,
      rotationAngle: Math.PI / 2 - Math.PI / 1.5,
    },
  })
  const centerMidBaseLoop = getUpdatedData({
    baseData: centerBaseLoop,
    dataUpdates: {
      'baseCircle.radius': (baseCircleRadius: number) => baseCircleRadius + 10,
    },
  })
  const centerRightMidLoop: RotatedLoop = {
    baseCircle: {
      radius: 4,
      center: getRotatedLoopPoint({
        someRotatedLoop: centerMidBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 + Math.PI / 3.5,
      }),
    },
    childCircle: {
      relativeRadius: 3 / 8,
      relativeDepth: 3 / 8,
      phaseAngle: Math.PI / 2,
    },
    rotationAnchor: 'base',
    rotationAngle: Math.PI / 2 - Math.PI / 1.5,
  }
  const centerLeftMidLoop = getUpdatedData({
    baseData: centerRightMidLoop,
    dataUpdates: {
      'baseCircle.center': getRotatedLoopPoint({
        someRotatedLoop: centerMidBaseLoop,
        sampleAngle: Math.PI + Math.PI / 2 - Math.PI / 3.5,
      }),
      'childCircle.phaseAngle': -Math.PI / 2,
      rotationAngle: Math.PI / 2 + Math.PI / 1.5,
    },
  })
  const centerPattern = [
    getElementIndices({
      targetValue: true,
      someSpace: getFilteredRhythm({
        rhythmSequence: [
          getNaturalRhythm({
            rhythmResolution: 24,
            rhythmDensity: 23,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 23,
            rhythmDensity: 11,
            rhythmPhase: 6,
          }),
          getNaturalRhythm({
            rhythmResolution: 11,
            rhythmDensity: 7,
            rhythmPhase: 3,
          }),
          getNaturalRhythm({
            rhythmResolution: 7,
            rhythmDensity: 5,
            rhythmPhase: 2,
          }),
        ],
      }),
    }).map((rhythmIndex, matchIndex) => ({
      rotatedLoop: getUpdatedData({
        baseData: centerTopLoop,
        dataUpdates: {
          'baseCircle.radius': (baseCircleRadius: number) =>
            baseCircleRadius - (baseCircleRadius / 24) * rhythmIndex,
        },
      }),
      strokeColor:
        (matchIndex + 0) % 3 !== 0
          ? (matchIndex + 0) % 3 !== 1
            ? Color['yellow']
            : Color['red']
          : Color['orange'],
    })),
    getElementIndices({
      targetValue: true,
      someSpace: getFilteredRhythm({
        rhythmSequence: [
          getNaturalRhythm({
            rhythmResolution: 24,
            rhythmDensity: 23,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 23,
            rhythmDensity: 11,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 11,
            rhythmDensity: 7,
            rhythmPhase: 4,
          }),
          getNaturalRhythm({
            rhythmResolution: 7,
            rhythmDensity: 4,
            rhythmPhase: 1,
          }),
        ],
      }),
    }).map((rhythmIndex, matchIndex) => ({
      rotatedLoop: getUpdatedData({
        baseData: centerRightTopLoop,
        dataUpdates: {
          'baseCircle.radius': (baseCircleRadius: number) =>
            baseCircleRadius - (baseCircleRadius / 24) * rhythmIndex,
          'baseCircle.center': (
            baseCircleCenter: Point,
            baseLoop: RotatedLoop
          ) => ({
            x:
              baseCircleCenter.x +
              (rhythmIndex * baseLoop.baseCircle.radius) / 128,
            y:
              baseCircleCenter.y +
              (rhythmIndex * baseLoop.baseCircle.radius) / 128,
          }),
        },
      }),
      strokeColor:
        (matchIndex + 0) % 3 !== 0
          ? (matchIndex + 0) % 3 !== 1
            ? Color['yellow']
            : Color['red']
          : Color['yellow'],
    })),
    getElementIndices({
      targetValue: true,
      someSpace: getFilteredRhythm({
        rhythmSequence: [
          getNaturalRhythm({
            rhythmResolution: 24,
            rhythmDensity: 23,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 23,
            rhythmDensity: 11,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 11,
            rhythmDensity: 7,
            rhythmPhase: 4,
          }),
          getNaturalRhythm({
            rhythmResolution: 7,
            rhythmDensity: 4,
            rhythmPhase: 1,
          }),
        ],
      }),
    }).map((rhythmIndex, matchIndex) => ({
      rotatedLoop: getUpdatedData({
        baseData: centerLeftTopLoop,
        dataUpdates: {
          'baseCircle.radius': (baseCircleRadius: number) =>
            baseCircleRadius - (baseCircleRadius / 24) * rhythmIndex,
          'baseCircle.center': (
            baseCircleCenter: Point,
            baseLoop: RotatedLoop
          ) => ({
            x:
              baseCircleCenter.x -
              (rhythmIndex * baseLoop.baseCircle.radius) / 128,
            y:
              baseCircleCenter.y +
              (rhythmIndex * baseLoop.baseCircle.radius) / 128,
          }),
        },
      }),
      strokeColor:
        (matchIndex + 0) % 3 !== 0
          ? (matchIndex + 0) % 3 !== 1
            ? Color['yellow']
            : Color['red']
          : Color['yellow'],
    })),
    getElementIndices({
      targetValue: true,
      someSpace: getFilteredRhythm({
        rhythmSequence: [
          getNaturalRhythm({
            rhythmResolution: 24,
            rhythmDensity: 23,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 23,
            rhythmDensity: 11,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 11,
            rhythmDensity: 7,
            rhythmPhase: 1,
          }),
          getNaturalRhythm({
            rhythmResolution: 7,
            rhythmDensity: 4,
            rhythmPhase: 1,
          }),
        ],
      }),
    }).map((rhythmIndex, matchIndex) => ({
      rotatedLoop: getUpdatedData({
        baseData: centerRightBottomLoop,
        dataUpdates: {
          'baseCircle.radius': (baseCircleRadius: number) =>
            baseCircleRadius - (baseCircleRadius / 24) * rhythmIndex,
          'baseCircle.center': (
            baseCircleCenter: Point,
            baseLoop: RotatedLoop
          ) => ({
            x:
              baseCircleCenter.x -
              (rhythmIndex * baseLoop.baseCircle.radius) / 1028,
            y:
              baseCircleCenter.y -
              (rhythmIndex * baseLoop.baseCircle.radius) / 64,
          }),
        },
      }),
      strokeColor:
        (matchIndex + 0) % 3 !== 0
          ? (matchIndex + 0) % 3 !== 1
            ? Color['orange']
            : Color['orange']
          : Color['yellow'],
    })),
    getElementIndices({
      targetValue: true,
      someSpace: getFilteredRhythm({
        rhythmSequence: [
          getNaturalRhythm({
            rhythmResolution: 24,
            rhythmDensity: 23,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 23,
            rhythmDensity: 11,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 11,
            rhythmDensity: 7,
            rhythmPhase: 1,
          }),
          getNaturalRhythm({
            rhythmResolution: 7,
            rhythmDensity: 4,
            rhythmPhase: 1,
          }),
        ],
      }),
    }).map((rhythmIndex, matchIndex) => ({
      rotatedLoop: getUpdatedData({
        baseData: centerLeftBottomLoop,
        dataUpdates: {
          'baseCircle.radius': (baseCircleRadius: number) =>
            baseCircleRadius - (baseCircleRadius / 24) * rhythmIndex,
          'baseCircle.center': (
            baseCircleCenter: Point,
            baseLoop: RotatedLoop
          ) => ({
            x:
              baseCircleCenter.x -
              (rhythmIndex * baseLoop.baseCircle.radius) / 1028,
            y:
              baseCircleCenter.y -
              (rhythmIndex * baseLoop.baseCircle.radius) / 64,
          }),
        },
      }),
      strokeColor:
        (matchIndex + 0) % 3 !== 0
          ? (matchIndex + 0) % 3 !== 1
            ? Color['orange']
            : Color['orange']
          : Color['yellow'],
    })),
    getElementIndices({
      targetValue: true,
      someSpace: getFilteredRhythm({
        rhythmSequence: [
          getNaturalRhythm({
            rhythmResolution: 24,
            rhythmDensity: 23,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 23,
            rhythmDensity: 11,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 11,
            rhythmDensity: 7,
            rhythmPhase: 2,
          }),
          getNaturalRhythm({
            rhythmResolution: 7,
            rhythmDensity: 4,
            rhythmPhase: 1,
          }),
        ],
      }),
    }).map((rhythmIndex, matchIndex) => ({
      rotatedLoop: getUpdatedData({
        baseData: centerRightMidLoop,
        dataUpdates: {
          'baseCircle.radius': (baseCircleRadius: number) =>
            baseCircleRadius - (baseCircleRadius / 24) * rhythmIndex,
          'baseCircle.center': (
            baseCircleCenter: Point,
            baseLoop: RotatedLoop
          ) => ({
            x:
              baseCircleCenter.x +
              (rhythmIndex * baseLoop.baseCircle.radius) / 1028,
            y:
              baseCircleCenter.y +
              (rhythmIndex * baseLoop.baseCircle.radius) / 88,
          }),
        },
      }),
      strokeColor:
        (matchIndex + 2) % 3 !== 0
          ? (matchIndex + 2) % 3 !== 1
            ? Color['yellow']
            : Color['red']
          : Color['orange'],
    })),
    getElementIndices({
      targetValue: true,
      someSpace: getFilteredRhythm({
        rhythmSequence: [
          getNaturalRhythm({
            rhythmResolution: 24,
            rhythmDensity: 23,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 23,
            rhythmDensity: 11,
            rhythmPhase: 0,
          }),
          getNaturalRhythm({
            rhythmResolution: 11,
            rhythmDensity: 7,
            rhythmPhase: 2,
          }),
          getNaturalRhythm({
            rhythmResolution: 7,
            rhythmDensity: 4,
            rhythmPhase: 1,
          }),
        ],
      }),
    }).map((rhythmIndex, matchIndex) => ({
      rotatedLoop: getUpdatedData({
        baseData: centerLeftMidLoop,
        dataUpdates: {
          'baseCircle.radius': (baseCircleRadius: number) =>
            baseCircleRadius - (baseCircleRadius / 24) * rhythmIndex,
          'baseCircle.center': (
            baseCircleCenter: Point,
            baseLoop: RotatedLoop
          ) => ({
            x:
              baseCircleCenter.x -
              (rhythmIndex * baseLoop.baseCircle.radius) / 1028,
            y:
              baseCircleCenter.y +
              (rhythmIndex * baseLoop.baseCircle.radius) / 88,
          }),
        },
      }),
      strokeColor:
        (matchIndex + 2) % 3 !== 0
          ? (matchIndex + 2) % 3 !== 1
            ? Color['yellow']
            : Color['red']
          : Color['orange'],
    })),
  ].flat()
  return (
    <svg
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
      }}
      viewBox={'-10 -10 120 120'}
      imageRendering={'optimizeQuality'}
    >
      <rect x={-10} y={-10} width={120} height={120} fill={Color['green']} />
      <g>
        {corePattern.map(({ rotatedLoop, strokeColor }, fooIndex) => (
          <Polygon
            points={getOscillatedRotatedLoopPoints({
              sampleCount: 256,
              oscillatedRotatedLoop: {
                ...rotatedLoop,
                getRelativeOscillation: () => Math.random() / 4.9,
              },
            })}
            fill={'none'}
            stroke={strokeColor}
            strokeWidth={0.2}
          />
        ))}
      </g>
      <g>
        {rimPattern.map(({ rotatedLoop, strokeColor }) => (
          <Polygon
            points={getOscillatedRotatedLoopPoints({
              sampleCount: 256,
              oscillatedRotatedLoop: {
                ...rotatedLoop,
                getRelativeOscillation: () => Math.random() / 4.4,
              },
            })}
            fill={'none'}
            stroke={strokeColor}
            strokeWidth={0.15}
          />
        ))}
      </g>
      <g>
        {centerPattern.map(({ rotatedLoop, strokeColor }) => (
          <Polygon
            points={getOscillatedRotatedLoopPoints({
              sampleCount: 256,
              oscillatedRotatedLoop: {
                ...rotatedLoop,
                getRelativeOscillation: () => Math.random() / 2.7,
              },
            })}
            fill={'none'}
            stroke={strokeColor}
            strokeWidth={0.15}
          />
        ))}
      </g>
    </svg>
  )
}

interface GetUpdatedDataApi<SomeData extends object> {
  baseData: SomeData
  dataUpdates: Partial<ComputableUpdates<KeyPathDataMap<SomeData>, SomeData>>
}

function getUpdatedData<SomeData extends object>(
  api: GetUpdatedDataApi<SomeData>
) {
  const { baseData, dataUpdates } = api
  return Object.entries(dataUpdates).reduce<SomeData>(
    (currentData, [targetDataPath, newData]) => {
      const pathTokens = targetDataPath.split('.')
      return updateData({
        currentData,
        newData,
        pathTokens,
        rootData: baseData,
      })
    },
    baseData
  )
}

type ComputableUpdates<SomeData extends object, RootData> = {
  [Key in keyof SomeData]:
    | SomeData[Key]
    | ((propertyData: SomeData[Key], rootData: RootData) => SomeData[Key])
}

type KeyPathDataMap<
  SomeData extends any,
  KeyPathBase extends string = '',
  Result extends object = {}
> = {
  [SomeKey in keyof SomeData]: SomeKey extends string
    ? SomeData[SomeKey] extends object
      ? KeyPathDataMap<
          SomeData[SomeKey],
          `${KeyPathBase}${SomeKey}.`,
          Result & { [T in `${KeyPathBase}${SomeKey}`]: SomeData[SomeKey] }
        >
      : Result & { [T in `${KeyPathBase}${SomeKey}`]: SomeData[SomeKey] }
    : never
}[keyof SomeData]

interface UpdateDataApi {
  pathTokens: string[]
  currentData: any
  newData: any
  rootData: any
}

function updateData(api: UpdateDataApi): any {
  const { pathTokens, currentData, newData, rootData } = api
  const pathKey = pathTokens.shift()!
  if (pathTokens.length === 0) {
    return {
      ...currentData,
      [pathKey]:
        typeof newData === 'function'
          ? newData(currentData[pathKey], rootData)
          : newData,
    }
  } else {
    return {
      ...currentData,
      [pathKey]: updateData({
        pathTokens,
        newData,
        rootData,
        currentData: currentData[pathKey]!,
      }),
    }
  }
}

interface PolygonPolygonProps
  extends Pick<SVGProps<SVGPolygonElement>, 'fill' | 'stroke' | 'strokeWidth'> {
  points: Point[]
}

function Polygon(props: PolygonPolygonProps) {
  const { points, ...polygonProps } = props
  return (
    <polygon
      {...polygonProps}
      strokeLinejoin={'round'}
      points={points
        .map((polygonPoint) => `${polygonPoint.x},${polygonPoint.y}`)
        .join(' ')}
    />
  )
}

interface OscillatedRotatedLoop extends RotatedLoop {
  getRelativeOscillation: (sampleAngle: number) => number
}

interface GetOscillatedRotatedLoopPointsApi {
  sampleCount: number
  oscillatedRotatedLoop: OscillatedRotatedLoop
}

function getOscillatedRotatedLoopPoints(
  api: GetOscillatedRotatedLoopPointsApi
) {
  const { sampleCount, oscillatedRotatedLoop } = api
  return new Array(sampleCount).fill(undefined).map((_, sampleIndex) =>
    getOscillatedRotatedLoopPoint({
      oscillatedRotatedLoop,
      sampleAngle: ((2 * Math.PI) / sampleCount) * sampleIndex,
    })
  )
}

interface GetOscillatedRotatedLoopPointApi {
  oscillatedRotatedLoop: OscillatedRotatedLoop
  sampleAngle: number
}

function getOscillatedRotatedLoopPoint(api: GetOscillatedRotatedLoopPointApi) {
  const { sampleAngle, oscillatedRotatedLoop } = api
  return getRotatedPoint({
    basePoint: getOscillatedPoint({
      originPoint: getLoopChildCircle({
        someLoop: oscillatedRotatedLoop,
      }).center,
      basePoint: getLoopPoint({
        sampleAngle,
        someLoop: oscillatedRotatedLoop,
      }),
      relativeOscillation:
        oscillatedRotatedLoop.getRelativeOscillation(sampleAngle),
    }),
    rotationAngle: oscillatedRotatedLoop.rotationAngle,
    anchorPoint:
      oscillatedRotatedLoop.rotationAnchor === 'base'
        ? oscillatedRotatedLoop.baseCircle.center
        : getLoopChildCircle({
            someLoop: oscillatedRotatedLoop,
          }).center,
  })
}

interface GetOscillatedPointApi {
  originPoint: Point
  basePoint: Point
  relativeOscillation: number
}

function getOscillatedPoint(api: GetOscillatedPointApi): Point {
  const { basePoint, originPoint, relativeOscillation } = api
  const deltaX = basePoint.x - originPoint.x
  const deltaY = basePoint.y - originPoint.y
  const relativeAngle = Math.atan2(deltaX, deltaY) - Math.PI / 2
  const relativeBaseLength = Math.sqrt(
    Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
  )
  const nextLength =
    relativeOscillation * relativeBaseLength + relativeBaseLength
  return {
    x: nextLength * Math.cos(-relativeAngle) + originPoint.x,
    y: nextLength * Math.sin(-relativeAngle) + originPoint.y,
  }
}
