import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  prepareClientSideRenderedTestsInteractionHistory,
  prepareServerSideRenderedTestsInteractionHistory,
} from './chart-measurements.ts'

const timings = (inputDelayMs: number, processingDurationMs: number) => ({
  inputDelayMs,
  processingDurationMs,
  presentationDelayMs: 3,
  interactionLatencyMs: inputDelayMs + processingDurationMs + 3,
})

const records = [
  {
    package: 'app-next',
    frameworkVersion: '14.0.0',
    clientSideRenderedTests: { interactionTests: timings(1, 2) },
    serverSideRenderedTests: { interactionTests: timings(4, 5) },
  },
  {
    package: 'app-next',
    frameworkVersion: '15.0.0',
    clientSideRenderedTests: { firstPaintMs: 100 },
    serverSideRenderedTests: { interactionTests: timings(6, 7) },
  },
  {
    package: 'app-next',
    frameworkVersion: '16.0.0',
    clientSideRenderedTests: {
      interactionTests: { ...timings(8, 9), presentationDelayMs: undefined },
    },
  },
  {
    package: 'app-next',
    frameworkVersion: '17.0.0',
    clientSideRenderedTests: { interactionTests: timings(10, 11) },
    serverSideRenderedTests: {
      interactionTests: { ...timings(12, 13), inputDelayMs: Number.NaN },
    },
  },
]

test('client history keeps only versions with complete interaction data, in input order', () => {
  assert.deepEqual(prepareClientSideRenderedTestsInteractionHistory(records), [
    { id: 'app-next:14.0.0', name: 'v14.0.0', ...timings(1, 2) },
    { id: 'app-next:17.0.0', name: 'v17.0.0', ...timings(10, 11) },
  ])
})

test('server history reads the server measurements independently', () => {
  assert.deepEqual(
    prepareServerSideRenderedTestsInteractionHistory(records).map(
      (row) => row.name,
    ),
    ['v14.0.0', 'v15.0.0'],
  )
})

test('history is empty when no version has interaction data', () => {
  assert.deepEqual(
    prepareClientSideRenderedTestsInteractionHistory([
      { package: 'app-pracht', frameworkVersion: '1.0.0' },
    ]),
    [],
  )
})

test('history rows carry only chart fields, not the raw measurement metadata', () => {
  const interactionTests = {
    ...timings(1, 2),
    scenario: 'first-row-detail-navigation',
  }
  const [row] = prepareClientSideRenderedTestsInteractionHistory([
    {
      package: 'app-next',
      frameworkVersion: '14.0.0',
      clientSideRenderedTests: { interactionTests },
    },
  ])
  assert.deepEqual(Object.keys(row!).sort(), [
    'id',
    'inputDelayMs',
    'interactionLatencyMs',
    'name',
    'presentationDelayMs',
    'processingDurationMs',
  ])
})
