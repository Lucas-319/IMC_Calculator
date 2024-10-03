import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Keyboard } from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style";

export default function Form() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [messageImc, setMessageImc] = useState("Preencha o peso e altura");
    const [imc, setImc] = useState(null);
    const [classification, setClassification] = useState("");
    const [textButton, setTextButton] = useState("Calcular");

    function imcCalculator() {
        const heightInMeters = parseFloat(height.replace(",", "."));
        const weightInKg = parseFloat(weight.replace(",", "."));
        if (isNaN(heightInMeters) || isNaN(weightInKg)) {
            setMessageImc("Valores inválidos. Tente novamente.");
            setImc(null);
            return;
        }
        const calculatedImc = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
        setImc(calculatedImc);
        handleClassification(calculatedImc);
    }

    function handleClassification(calculatedImc) {
        if (calculatedImc < 18.5) {
            setClassification("Baixo peso");
        } else if (calculatedImc >= 18.5 && calculatedImc <= 24.99) {
            setClassification("Normal");
        } else if (calculatedImc >= 25 && calculatedImc <= 29.99) {
            setClassification("Sobrepeso");
        } else if (calculatedImc >= 30) {
            setClassification("Obesidade");
        } else {
            setClassification("");
        }
    }

    function validatorImc() {
        if (weight && height) {
            imcCalculator();
            setMessageImc("Seu IMC é igual:");
            setTextButton("Calcular novamente");
            setHeight("");
            setWeight("");
            Keyboard.dismiss(); // Fecha o teclado após cálculo
        } else {
            setMessageImc("Preencha o peso e altura corretamente");
            setImc(null);
        }
    }

    return (
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(newHeight) => setHeight(newHeight)}
                    value={height}
                    placeholder="Ex. 1.72"
                    keyboardType="numeric"
                />
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(newWeight) => setWeight(newWeight)}
                    value={weight}
                    placeholder="Ex. 60.5"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={() => validatorImc()}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultIMC messageResultImc={messageImc} ResultImc={imc} classification={classification} />
        </View>
    );
}
