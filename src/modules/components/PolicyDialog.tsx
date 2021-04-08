import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, TextField } from "@material-ui/core";
import axios from "axios";
import produce from "immer";

import React, { useState } from "react";
import Typographic from './CTypography';
import { useTranslation } from "react-i18next";
import ClassDialog from "./policy/app.component.policy.classes";
import CompiledDialog from "./policy/app.component.policy.compiled";
import CountDialog from "./policy/app.component.policy.count";
import StructureDialog from "./policy/app.component.policy.custom.ds";
import ExceptionDialog from "./policy/app.component.policy.custom.except";
import EncapDialog from "./policy/app.component.policy.encap";
import InterfaceDialog from "./policy/app.component.policy.interface";
import InputDialog from "./policy/app.component.policy.io";
import JavadocDialog from "./policy/app.component.policy.javadoc";
import OverloadingDialog from "./policy/app.component.policy.ovl";
import OverridingDialog from "./policy/app.component.policy.ovr";
import PackageDialog from "./policy/app.component.policy.package";
import SuperclassDialog from "./policy/app.component.policy.super";
import ThreadDialog from "./policy/app.component.policy.thread";


interface PolicyProps {
    state: boolean,
    className: string,
    instructor: string,
    token: string,
    itoken: string,
    isDirect: boolean,
};


export default function SelectCond(props: PolicyProps) {

    const { t } = useTranslation(); 

    const initial_state = {
        className: props.className,
        instructor: props.instructor,
        feedback: props.isDirect,
        token: props.token,
        itoken: props.itoken,
        count: false,
        compiled: false,
        inputs: false,
        classes: false,
        packages: false,
        custexc: false,
        custstr: false,
        interfaces: false,
        superclass: false,
        overriding: false,
        overloading: false,
        thread: false,
        javadoc: false,
        encapsulation: false
    };


    const initial_data = {
        className: props.className,
        instructor: props.instructor,
        feedback: props.isDirect,
        token: props.token,
        itoken: props.itoken,
        point: 0,
        count: { state: false } as Object,
        compiled: { state: false } as Object,
        runtimeCompare: { state: false } as Object,
        classes : { state: false } as Object,
        packages: { state: false } as Object,
        customException: { state: false } as Object,
        customStructure: { state: false } as Object,
        inheritSuper: { state: false } as Object,
        inheritInterface: { state: false } as Object,
        overriding: { state: false } as Object,
        overloading: { state: false } as Object,
        javadoc: { state: false } as Object,
        thread: { state: false } as Object,
        encapsulation: { state: false } as Object,
    };

    const [open, setOpen] = useState(props.state);
    const [policy, setPolicy] = useState(initial_data);
    const [state, setState] = useState(initial_state);
    const [submitted, setSubmitted] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setState(initial_state);
    }


    const handleSubmittedClose = () => {
        setSubmitted(false);
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'thread' || e.target.name === 'javadoc' || e.target.name === 'encapsulation') {
            setPolicy(
                produce(draft => {
                    draft[e.target.name] = e.target.checked;
                })
            )
        }

        setState(
            produce(draft => {
                draft[e.target.name] = e.target.checked;
            })
        );
    }


    const handleCreate = (types: string, data : Object) => {
        setPolicy(
            produce(draft => {
                draft[types] = data;
            })
        );
    }

    
    const handleSubmit = () => {
        axios.post("http://isel.lifove.net/api/token/save", JSON.stringify(policy, null, 2), {
        //axios.post("/api/token/save", JSON.stringify(policy, null, 2), {    
            headers: {"Content-Type": 'application/json'}
        }).then((res) => {
            setOpen(false);
            setState(initial_state);
            setSubmitted(true);
        })

        console.log( JSON.stringify(policy, null, 2) );
    }

    return (
        <div>
            {open &&
                <Dialog 
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick={true}
                    disableEscapeKeyDown={true}
                    maxWidth="md"
                    scroll='paper'
                >
                <DialogTitle id="form-dialog-title">{t('dialog.1')}</DialogTitle>
                <DialogContent dividers>
                <DialogContentText>
                    {t('dialog.2')}
                </DialogContentText>
                    <TextField
                        type="number"
                        value={policy.point}
                        label={t('policy.point')}
                        size="small"
                        margin="dense"
                        onChange={e => setPolicy({ ...policy, point: (parseFloat(e.target.value) || policy.point)})}
                    />
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.count}
                                        onChange={handleChange}
                                        name="count" />}
                            label="Count"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox checked={state.compiled}
                                        onChange={handleChange}
                                        name="compiled" />}
                            label="Compile"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox checked={state.inputs}
                                        onChange={handleChange}
                                        name="inputs" />}
                            label="Input"
                        />
                        
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.classes}
                                        onChange={handleChange}
                                        name="classes" />}
                            label="Classes"
                        />
                        
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.packages}
                                        onChange={handleChange}
                                        name="packages" />}
                            label="Packages"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.interfaces}
                                        onChange={handleChange}
                                        name="interfaces" />}
                            label="Interface"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.superclass}
                                        onChange={handleChange}
                                        name="superclass" />}
                            label="Superclass"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.overriding}
                                        onChange={handleChange}
                                        name="overriding" />}
                            label="Overriding"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.overloading}
                                        onChange={handleChange}
                                        name="overloading" />}
                            label="Overloading"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.custexc}
                                        onChange={handleChange}
                                        name="custexc" />}
                            label="Custom Exception Class"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.custstr}
                                        onChange={handleChange}
                                        name="custstr" />}
                            label="Custom Data Structure Class"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.thread}
                                        onChange={handleChange}
                                        name="thread" />}
                            label="Threads"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.javadoc}
                                        onChange={handleChange}
                                        name="javadoc" />}
                            label="Javadoc"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={state.encapsulation}
                                        onChange={handleChange}
                                        name="encapsulation" />}
                            label="Encapsulation"
                        />
                    </FormGroup>
                    
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('closed')}
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        {t('submit')}
                    </Button>
                </DialogActions>
                
                {state.count && 
                    <CountDialog open={state.count} onCreate={handleCreate} keepMounted /> } 

                {state.compiled && 
                    <CompiledDialog open={state.compiled} onCreate={handleCreate} keepMounted /> }

                {state.inputs && 
                    <InputDialog open={state.inputs} onCreate={handleCreate} keepMounted /> }
                
                {state.classes &&
                    <ClassDialog open={state.classes} onCreate={handleCreate} keepMounted /> }

                {state.packages &&
                    <PackageDialog open={state.packages} onCreate={handleCreate} keepMounted />}
                
                {state.interfaces &&
                    <InterfaceDialog open={state.interfaces} onCreate={handleCreate} keepMounted />}

                {state.superclass &&
                    <SuperclassDialog open={state.superclass} onCreate={handleCreate} keepMounted />}

                {state.overriding &&
                    <OverridingDialog open={state.overriding} onCreate={handleCreate} keepMounted />}

                {state.overloading &&
                    <OverloadingDialog open={state.overloading} onCreate={handleCreate} keepMounted />}

                {state.custexc &&
                    <ExceptionDialog open={state.custexc} onCreate={handleCreate} keepMounted />}

                {state.custstr &&
                    <StructureDialog open={state.custstr} onCreate={handleCreate} keepMounted />}

                {state.javadoc &&
                    <JavadocDialog open={state.javadoc} onCreate={handleCreate} keepMounted />}

                {state.thread &&
                    <ThreadDialog open={state.thread} onCreate={handleCreate} keepMounted />}

                {state.encapsulation &&
                    <EncapDialog open={state.encapsulation} onCreate={handleCreate} keepMounted />}

                </Dialog>
            }

            {submitted && 
                <Dialog
                    open={submitted}
                    onClose={handleSubmittedClose}
                    maxWidth="sm"
                    scroll='paper'
                >
                    <DialogTitle id="form-dialog-title">
                        {t('check.again.1')}
                    </DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText>
                            {t('check.again.2')}
                            <Typographic variant="h3" color="inherit">
                                <Typographic variant="caption" color="inherit">
                                    {t('gtoken')} <br />
                                </Typographic>
                                {policy.token}
                                <br />
                                <Typographic variant="caption" color="inherit">
                                    {t('itoken')} <br />
                                </Typographic>
                                {policy.itoken}
                            </Typographic>
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleSubmittedClose} color="primary">
                            {t('closed')}
                        </Button>
                    </DialogActions>
                </Dialog>
            }

        </div>
    )
}