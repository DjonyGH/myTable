export interface IData1 {
  id: number
  field1: number
  field2: string
  field3: string
  field4: boolean
}

export interface IData2 {
  id: number
  field1: number
  field2: string
  field3: string
  field4: boolean
  field5: number[]
}

export interface IData3 {
  id: number
  field1: number
  field2: string
  field3: string
  field4: boolean
  field5: number[]
  field6: number[]
}

export interface IData4 {
  id: number
  field1: number
  field2: string
  field3: string
  field4: boolean
  field5: number[]
  field6: number[][]
}

export interface IData5 {
  id: number
  field1: number
  field2: string
  field3: string
  field4: boolean
  field5: {
    subField1: number
    subField2: number[]
  }[]
}

export interface IData6 {
  id: number
  field1: number
  field2: string
  field3: string
  field4: boolean
  field5: {
    subField1: number
    subField2: {
      subSubField1: number
      subSubField2: number[]
    }[]
  }[]
}
