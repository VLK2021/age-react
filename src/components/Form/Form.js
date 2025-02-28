import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";

import './FormStyle.css';


const Form = ({setAgePerson}) => {
    const {register, handleSubmit, reset, formState: {errors, isValid}, watch} = useForm({mode: "onBlur"});
    const [showTextForm, setShowTextForm] = useState(false);

    const year = watch('year');
    const month = watch('month');
    const day = watch('day');

    const submit = (data) => {
        const formattedMonth = data.month.padStart(2, '0');
        const formattedDay = data.day.padStart(2, '0');
        const fullAge = `${data.year}-${formattedMonth}-${formattedDay}`;
        setAgePerson(fullAge);
        reset();
    }

    const validateDate = (year, month, day) => {
        const date = new Date(year, month - 1, day);
        const now = new Date();
        
        if (date > now) {
            return "Дата не може бути в майбутньому";
        }
        
        if (date.getMonth() !== month - 1) {
            return "Некоректна дата";
        }
        
        return true;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTextForm(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);


    return (
        <div className={'form'}>
            <div className={`textForm ${showTextForm ? "showForm" : ""}`}>
                Write your birthday day
            </div>

            <form onSubmit={handleSubmit(submit)}>
                <div className={'inpContainer'}>
                    <div className={'inputBlock'}>
                        <div>
                            <label>year:</label>
                            <input type="number" {...register('year', {
                                required: 'Поле повинно бути заповнене!',
                                min: {
                                    value: 1900,
                                    message: 'Рік не може бути менше 1900'
                                },
                                max: {
                                    value: new Date().getFullYear(),
                                    message: 'Рік не може бути більше поточного'
                                },
                                pattern: {
                                    value: /^[^\d.-e]*\d{4}[^\d.-]*$/,
                                    message: 'Помилка вводу даних'
                                }
                            })} placeholder={'0000'}/>
                        </div>

                        <div className={"error"}>
                            {errors?.year && <p>{errors?.year?.message || 'Error'}</p>}
                        </div>
                    </div>

                    <div className={'inputBlock'}>
                        <div>
                            <label>month:</label>
                            <input type="number" {...register('month', {
                                required: 'Поле повинно бути заповнене!',
                                min: {
                                    value: 1,
                                    message: 'Місяць має бути від 1 до 12'
                                },
                                max: {
                                    value: 12,
                                    message: 'Місяць має бути від 1 до 12'
                                }
                            })} placeholder={'00'}/>
                        </div>

                        <div className={"error"}>
                            {errors?.month && <p>{errors?.month?.message || 'Error'}</p>}
                        </div>
                    </div>

                    <div className={'inputBlock'}>
                        <div>
                            <label>day:</label>
                            <input type="number" {...register('day', {
                                required: 'Поле повинно бути заповнене!',
                                min: {
                                    value: 1,
                                    message: 'День має бути від 1 до 31'
                                },
                                max: {
                                    value: 31,
                                    message: 'День має бути від 1 до 31'
                                },
                                validate: (value) => {
                                    if (year && month && value) {
                                        return validateDate(year, month, value);
                                    }
                                    return true;
                                }
                            })} placeholder={'00'}/>
                        </div>

                        <div className={"error"}>
                            {errors?.day && <p>{errors?.day?.message || 'Error'}</p>}
                        </div>
                    </div>
                </div>

                <button disabled={!isValid} className={'form-btn'}>ok</button>
            </form>
        </div>
    );
};

export default Form;