import { useEffect, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
    const [formState, setFormState] = useState(initialForm);
    const [formInvalidMsg, setFormInvalidMsg] = useState({});

    useEffect(() => {
        validateForm();
    }, [formState]);

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const onResetForm = () => {
        setFormState(initialForm);
    };

    const validateForm = () => {
        const formInvalidMsgValues = {};

        for (const formField of Object.keys(formValidations)) {
            const [fn, errorMessage] = formValidations[formField];

            formInvalidMsgValues[`${formField}InvalidMessage`] = fn(
                formState[formField]
            )
                ? null
                : errorMessage;

            setFormInvalidMsg(formInvalidMsgValues);
        }
    };

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formInvalidMsg
    };
};
