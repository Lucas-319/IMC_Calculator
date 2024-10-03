import React from "react";
import { View, Text } from "react-native";
import styles from "./style";

export default function ResultIMC(props) {
    return (
        <View style={styles.resultImc}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberImc}>{props.ResultImc}</Text>
            {props.ResultImc && (
                <Text style={styles.classification}>{`Classificação: ${props.classification}`}</Text>
            )}
        </View>
    );
}
