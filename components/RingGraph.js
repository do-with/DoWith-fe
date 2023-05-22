import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';

const RingGraph = ({ data }) => {
    const chartConfig = {
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
    };

    return (
        <View style={styles.ringGraphContainer}>
            <ProgressChart
                data={data}
                width={170}
                height={150}
                strokeWidth={30}
                radius={60}
                chartConfig={chartConfig}
                hideLegend={true}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    ringGraphContainer: {
    },
})

export default RingGraph;