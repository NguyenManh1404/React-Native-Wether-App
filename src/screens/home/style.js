import { Platform, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const styles = StyleSheet.create({
    header:{
        backgroundColor:COLORS.primary,
        alignItems:'center',
        paddingTop:15,
        borderTopColor:'white',
        borderTopWidth:1,
         
    },
    appName:{
        color:COLORS.white,
        fontWeight:'bold',
        fontSize:SIZES.h2
    },
    noData: {
        marginTop: 100,
        alignItems: 'center',
      },
      noDataTxt: {
        color: COLORS.accent,
        fontSize: SIZES.h2,
        fontWeight: 'bold',
      },
});

export default styles;