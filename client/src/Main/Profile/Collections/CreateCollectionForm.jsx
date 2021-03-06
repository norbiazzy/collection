import React from "react";
import InputForm from "../../../all/InputForm";
import {Form, Field} from "react-final-form";
import {saveCollectionThunk} from "../../../redux/collectionsReducer";
import arrayMutators from "final-form-arrays";
import AdditionallyCollectionFields from "./AdditionalsCollectionFiels";
import {TextareaForm} from "../../../all/TextareaForm";
import {getTopicsSelect} from "../../../redux/selectors/collection-select";
import {compose} from "redux";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {connect} from "react-redux";
import ReactSelectAdapter from "../../../all/ReactSelectAdapter";


const CreateCollectionForm = (props) => {
  
  
  let onSubmit = values => {
    const body = {
      name: values.name,
      description: values.description,
      topic: values.topic,
      headers: {
        text: values.text,
        number: values.number,
        textarea: values.textarea,
        checkbox: values.checkbox,
        date: values.date,
      }
    }
    props.saveCollectionThunk(body, props.iToken, props.userId)
  }
  
  const required = value => (value ? undefined : true)
  return (<div className={'mb-4'}>
    <Form
      onSubmit={onSubmit}
      mutators={{
        ...arrayMutators
      }}
      render={({
                 handleSubmit, form: {mutators: {push, pop}}
               }) => {
        props.setSubmit(handleSubmit)
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <InputForm name={"name"} type={"text"} required={required} nameText={"Collection name"}/>
            </div>
            <div>
              <TextareaForm name={"description"} nameText={"Description"}/>
            </div>
            <div className={'mb-2'}>
              <Field
                name="topic"
                options={props.topics}
                component={ReactSelectAdapter}
              />
            </div>
            <div className={'d-flex'}>
              <AdditionallyCollectionFields name={'text'} push={push} pop={pop} title={'Text'} validate={required}/>
              <AdditionallyCollectionFields name={'number'} push={push} pop={pop} title={'Number'} validate={required}/>
              <AdditionallyCollectionFields name={'textarea'} push={push} pop={pop} title={'Textarea'}
                                            validate={required}/>
              <AdditionallyCollectionFields name={'checkbox'} push={push} pop={pop} title={'Checkbox'}
                                            validate={required}/>
              <AdditionallyCollectionFields name={'date'} push={push} pop={pop} title={'Date'} validate={required}/>
            </div>
          </form>
        )
      }}
    />
  </div>)
}

const mapStateToProps = (state) => ({
  topics: getTopicsSelect(state)
})
export default compose(
  AuthDataHOC,
  connect(mapStateToProps, {saveCollectionThunk}),
)(CreateCollectionForm)
