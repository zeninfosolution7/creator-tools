export type LandUnit = {
  key: string
  label: string
  factor: number
}

export type LandState = {
  name: string
  lang: string
  bigha: number
  labels?: Record<string, string>
  placeholder?: string
}

export type LandStates = Record<string, LandState>

export type RegionalUnits = Record<string, LandUnit[]>
