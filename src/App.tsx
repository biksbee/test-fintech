import { useState, useEffect } from 'react'
import './App.css';
import { LineWrapper } from "./components/linne/LineWraper";
import {Input} from "./components/input/Input";
import {Button} from "./components/button/Button";
import { DropDownMenu } from "./components/dropDown/DropDownMenu";
import pay from "./assets/icon/inputIcon.svg"

import { text } from "./text"
const RES = 'res';
export default function App() {

    const [price, setPrice] = useState<number>(1000000)
    const [contribution, setContribution] = useState<number>(price)
    const [time, setTime] = useState<number>(30)
    const [payment, setPayment] = useState<number>(2654)
    const [city, setCity] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [question, setQuestion] = useState<string>('')

    const [disabled, setDisabled] = useState<boolean>(true)

    useEffect(() => {
        if(
            price <= 10000000 &&
            price/4 <= contribution &&
            time <= 30 &&
            payment >= 2654 &&
            city !== '' && date !== '' && type !== '' && question !== ''
        ){
            setDisabled(false)
        } else setDisabled(true)

    }, [price, contribution, time, payment, city, date, type, question]);

    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem(RES) ?? '{}'))
    }, []);

    const send = (): void => {
        localStorage.setItem(RES, JSON.stringify({price, contribution, time, payment, city, date, type, question}))
        window.location.reload();
    }

  return (
          <div className="mainBox">
              <div id="box" className="h-full xl:w-[1139px] xl:mx-0 md:mx-[61px] mx-0 w-full min-w-[350px]">
                  <div className="mainTitle">
                      Рассчитайте ипотеку быстро и просто
                  </div>
                  <LineWrapper>
                        <Input
                            id="price"
                            value={price}
                            onChange={setPrice}
                            type={"price"}
                            placeholder={"Стоимость недвижимости"}
                            icon={pay}
                            setDisabled={setDisabled}
                        />
                      <DropDownMenu
                          data={text.city}
                          label={'Город покупки недвижимости'}
                          text={'Выберите город'}
                          setData={setCity}
                          numberLine={1}
                          showSearch={true}
                      />
                      <DropDownMenu
                          data={text.date}
                          label={'Когда вы планируете оформить ипотеку?'}
                          text={'Выберите период'}
                          setData={setDate}
                          numberLine={1}
                          showSearch={false}
                      />
                  </LineWrapper>
                  <LineWrapper>
                      <Input
                          id="contribution"
                          value={contribution}
                          onChange={setContribution}
                          type={"contribution"}
                          placeholder={"Первоначальный взнос"}
                          icon={pay}
                          related={price}
                          setDisabled={setDisabled}
                      />
                      <DropDownMenu
                          data={text.type}
                          label={'Тип недвижимости'}
                          text={'Выберите тип недвижимости'}
                          setData={setType}
                          numberLine={2}
                          showSearch={false}
                      />
                      <DropDownMenu
                          data={text.question}
                          label={'Вы уже владеете недвижимостью?'}
                          text={'Выберите ответ'}
                          setData={setQuestion}
                          numberLine={2}
                          showSearch={false}
                      />
                  </LineWrapper>
                  <span
                      className="border-b-[1px] border-b-c_grey-base my-[32px] w-full flex"
                  />
                  <LineWrapper>
                      <Input
                          id="time"
                          value={time}
                          onChange={setTime}
                          type={"time"}
                          placeholder={"Cрок"}
                          setDisabled={setDisabled}
                      />
                      <Input
                          id="payment"
                          value={payment}
                          onChange={setPayment}
                          type={"payment"}
                          placeholder={"Ежемесячный платеж"}
                          icon={pay}
                          setDisabled={setDisabled}
                      />
                  </LineWrapper>
                  <div className="flex justify-end md:py-[32px] py-[24px] md:mx-0 px-[20px] md:bg-c_grey-dark bg-c_grey-base">
                      <Button
                          disabled={disabled}
                          type={disabled ? "disabled" : "active"}
                          handler={send}
                      />
                  </div>
              </div>

          </div>
  )
}