import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const BarGraph = ({ data }) => {
    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 1,
        // backgroundColor: '#fff',
        // backgroundGradientFrom: '#fb8c00',
        // backgroundGradientTo: '#ffa726',
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
                height={200}
                chartConfig={chartConfig}
                verticalLabelRotation={10}
            />
      </View>
    )
};

const styles = StyleSheet.create({
    chartContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        height: '60%',
        borderRadius: 8,
        overflow: 'hidden',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 2,
        //     height: 3,
        // },
        // shadowOpacity: 0.11,
        // shadowRadius: 4,
    },
});

export default BarGraph;