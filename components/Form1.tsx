import { useState, Fragment } from 'react'
import { CheckMark, Circle, CircleChecked, EmptyBox } from './svg'

type FormData = {
  covered: boolean
  name: string
  nickName: string
  subscriber: boolean
  insurance: 'primary' | 'secondary' | ''
  id: '' | number
}

export default function Form1() {
  // Initial data for formData
  const initData: FormData[] = [
    {
      covered: true,
      name: 'Jerome Bell',
      nickName: 'Rome',
      subscriber: true,
      insurance: 'primary',
      id: '',
    },
    {
      covered: true,
      name: 'Stacy Bell',
      nickName: 'Stacy',
      subscriber: false,
      insurance: 'primary',
      id: '',
    },
    {
      covered: false,
      name: 'Rebecca Bell',
      nickName: 'Becca',
      subscriber: false,
      insurance: '',
      id: '',
    },
  ]

  // Initialize adding name data
  const initNameData = {
    'First Name': '',
    'Last Name': '',
    Nickname: '',
  }

  const [formData, setFormData] = useState<FormData[]>(initData)
  const [nameData, setNameData] = useState<Record<string, string>>(initNameData)

  // Switch data on appropriate button on click
  const handleButton = (row: number, type: 'covered' | 'subscriber') => {
    let tempData = [...formData]
    tempData[row][type] = !tempData[row][type]
    setFormData(tempData)
  }

  // I chose to use buttons for semantics and had to use preventDefault to allow clicks without refresh
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const clientEls = formData.map((data, i) => {
    const { covered, name, nickName, subscriber, insurance, id } = data
    const firstLetter = name.split(' ')[0][0]
    const lastLetter = name.split(' ')[1][0]
    return (
      <div className=' flex items-center h-11' key={name}>
        <button
          onClick={() => handleButton(i, 'covered')}
          className=' mr-4 text-xs w-16 gap-x-4 flex items-center justify-center'
        >
          {covered ? <CheckMark /> : <EmptyBox />}
        </button>

        <div className=' flex items-center mr-4 text-xs w-44 gap-x-1'>
          <div>
            {firstLetter}
            {lastLetter}
          </div>
          {name}
          <span>{` (${nickName})`}</span>
        </div>

        <button
          onClick={() => handleButton(i, 'subscriber')}
          className=' mr-4 text-xs w-14 gap-x-4 flex items-center justify-center'
        >
          {subscriber ? <CircleChecked /> : <Circle />}
        </button>

        <div className=' mr-4 text-xs w-28 gap-x-4'>
          <select name='insurance'>
            <option value='' />
            <option value='primary' selected={insurance === 'primary'}>
              Primary
            </option>
            <option value='primary' selected={insurance === 'secondary'}>
              Secondary
            </option>
          </select>
        </div>

        <input
          className=' mr-4 text-xs w-28'
          name='id'
          placeholder='Ins. ID/SSN'
          type='number'
        />
      </div>
    )
  })

  const inputData = [
    {
      name: 'First Name',
      type: 'text',
    },
    {
      name: 'Last Name',
      type: 'text',
    },
    {
      name: 'Nickname',
      type: 'text',
    },
  ]

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameData({ ...nameData, [e.currentTarget.name]: e.currentTarget.value })
  }

  const handleAdd = () => {
    let tempData = [...formData]
    tempData.push({
      covered: false,
      name: `${nameData['First Name']} ${nameData['Last Name']}`,
      nickName: nameData.Nickname,
      subscriber: false,
      insurance: '',
      id: '',
    })
    setFormData(tempData)
    setNameData(initNameData)
  }

  const inputEls = inputData.map((id: { name: string; type: string }) => (
    <Fragment key={id.name}>
      <label className=' text-xs' htmlFor={id.name}>
        {id.name}
      </label>
      <input
        className=' mr-4 text-xs w-44 gap-x-4 px-4'
        name={id.name}
        type={id.type}
        onChange={handleName}
        value={nameData[id.name]}
      />
    </Fragment>
  ))

  return (
    <div className=' text-semibold sans text-gray-500'>
      <form
        className=' max-w-32 border border-gray-300 p-4 m-4 rounded-md'
        onSubmit={handleSubmit}
      >
        <div className=' '>
          <h1>Household</h1>
          <div>
            <div className=' flex'>
              <div className=' mr-4 text-xs w-16 gap-x-4'>Covered</div>
              <div className=' mr-4 text-xs w-44 gap-x-4'>Name</div>
              <div className=' mr-4 text-xs w-14 gap-x-4'>Subscriber</div>
              <div className=' mr-4 text-xs w-28 gap-x-4'>Insurance</div>
              <div className=' mr-4 text-xs w-28'>ID</div>
            </div>
            {clientEls}
          </div>
          {inputEls}
          <button className=' text-xs' onClick={handleAdd}>
            +Add new member
          </button>
        </div>
      </form>
    </div>
  )
}
