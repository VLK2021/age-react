import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";

import './FormStyle.css';


const Form = ({setAgePerson}) => {
    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm({mode: "onBlur"});
    const [showTextForm, setShowTextForm] = useState(false);


    const submit = (data) => {
        const fullAge = data.year + '-' + data.month + '-' + data.day;
        setAgePerson(fullAge);
        reset();
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
                                minLength: {
                                    value: 4,
                                    message: 'min length 4'
                                },
                                maxLength: {
                                    value: 4,
                                    message: 'max length 4'
                                },
                                pattern: {
                                    value: /^[^\d.-e]*\d{4}[^\d.-]*$/,
                                    message: 'помилка вводу даних'
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
                                minLength: {
                                    value: 2,
                                    message: 'min length 2'
                                },
                                maxLength: {
                                    value: 2,
                                    message: 'max length 2'
                                },
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