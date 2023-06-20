import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const BarGraph = ({ data }) => {
    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 1,
        barPercentage: 0.2, // 막대의 너비 조정
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    };

    return (
        <View style={styles.chartContainer}>
            <BarChart
                data={data}
                width={350}
                height={290}
                chartConfig={chartConfig}
                verticalLabelRotation={90}
            />
      </View>
    )
};

const styles = StyleSheet.create({
    chartContainer: {
        display: 'flex',
        alignItems: 'center',
        height: '70%',
        borderRadius: 8,
        overflow: 'hidden',
    },
});

export default BarGraph;