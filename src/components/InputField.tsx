import * as React from 'react';
import { Button, Col, NumberInput, Form, Text, MarginTop, HorizontalAlignment, FontStyle } from '@skillsets/react-components';
import { connect } from 'react-redux';

import { addSalary } from '../actions/employeeActions';
import { toggleTimer } from '../actions/timerActions';
import { AppState } from '../reducers';
import { Employee } from '../reducers/employeeReducer';

/* 
    1. OwnProps
    2. StateProps "state means redux state"
    3. DispatchProps. Funtions/actions meant to change the state
    4. State. Regular state
*/

interface InputFieldOwnProps {}

interface InputFieldStateProps {
    employees: Array<Employee>,
    timerShouldRun: boolean,
}

interface InputFieldDispatchProps {
    addSalary: (salarywhatever: number) => void;
    toggleTimer: () => void;
}

type InputFiledProps = InputFieldOwnProps & InputFieldStateProps & InputFieldDispatchProps

interface InputFieldState {
    hourlyRate?: number;
}

class InputField extends React.Component<InputFiledProps, InputFieldState> {
    constructor(props: InputFiledProps) {
        super(props)
        this.state = {
            // hourlyRate: 0,
        };
    }

    render() {
        return (
            <Col horizontalAlignment={HorizontalAlignment.CENTER}>
                <Text 
                    fontStyle={FontStyle.NORMAL}
                    marginTop={MarginTop.SMALL}
                >
                    Input your own and your coworkers hourly rates one by one and press "Start meeting"
                </Text>
                
                <Col horizontalAlignment={HorizontalAlignment.CENTER} marginTop={MarginTop.SMALL}>
                    <Form sm={11} md={6} onSubmit={ this.onSubmit }>
                        <Col>
                            <NumberInput 
                                label='Salary'
                                value={ this.state.hourlyRate }
                                onValueChanged={ this.onChange }
                            />
                        </Col>
                            
                        <Col marginTop={MarginTop.SMALL} horizontalAlignment={HorizontalAlignment.CENTER}>
                            <Button text="Add" />
                        </Col>
                    </Form>
                    { this.renderToggleTimerButton() }
                </Col>
            </Col>
        )
    }

    // Make better names
    onChange = (rate?: number) => {
        // this.setState({ [e.target.name]: e.target.value });
        this.setState({ hourlyRate: rate });
    };

    onSubmit = () => { 
        // e.preventDefault();
        // TODO: Sanatize input so calculation can not get corrupted
        this.props.addSalary(200);
        // this.props.addSalary(this.props.salaries.concat([Number(this.state.hourlyRate)]));
    };

    toogleTimer = () => {
        this.props.toggleTimer();
    }

    renderToggleTimerButton = () => {
        if(!this.props.timerShouldRun) {
            return (
                <Button 
                    text={'Start meeting'} 
                    onClick={ this.toogleTimer }
                    marginTop={MarginTop.TINY}
                />
            )
        } else {
            return (
                <Button 
                    text={'Pause meeting'} 
                    onClick={ this.toogleTimer }
                    marginTop={MarginTop.TINY}
                />
            )
        }
    }

}

const mapStateToProps = (state: AppState): InputFieldStateProps => ({
    employees: state.employees.employeeArray,
    timerShouldRun: state.timer.timerShouldRun,
})

export default connect<InputFieldStateProps, InputFieldDispatchProps, InputFieldOwnProps>(mapStateToProps, { addSalary, toggleTimer })(InputField);