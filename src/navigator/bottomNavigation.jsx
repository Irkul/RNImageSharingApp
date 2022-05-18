import React from "react";
import { Image, View, StyleSheet, Text, } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
    ListScreen,
    PurchaseItemsScreen,
    ContactScreen,
    PartnersScreen,
} from 'src/screens';

export default BottomNavigation = ({route}) => {
    const BottomTab = createBottomTabNavigator();
    const { selectedIndex } = route.params;
    const screens = [ 
        "ListScreen",
        "PurchaseItemsScreen",
        "PartnersScreen",
        "ContactScreen"
    ];
    
    const getTabBarVisibility = (route) => {
        // if(route.state === undefined) return true;
        // const routeName = route.state
        //   ? route.state.routes[route.state.index].name
        //   : "";
    
        // for (let screen of screens)
        //   if (routeName === screen) {
        //     return true;
        //   }
    
        // return false;
        const routeName = getFocusedRouteNameFromRoute(route);
        const hideOnScreens = ['EditProfile'];
        if (hideOnScreens.indexOf(routeName) > -1) return false;
        return true;
    };

    return (
        <BottomTab.Navigator
            initialRouteName={screens[selectedIndex]}
            tabBarOptions={{
                style: styles.bar_wrapper,
            }}
        >
            <BottomTab.Screen
                name="ListScreen"
                component={ListScreen}
                options={({ route }) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: () => {
                        return;
                    },
                    tabBarIcon: ({ focused }) => {
                    if (focused)
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image_active}>
                                <Image
                                    source={require(`${pathToAsset}icons/collapses.png`)}
                                    style={{height: 25, width: 25}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Edit Previous</Text>
                            </View>
                        );
                    else
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image}>
                                <Image
                                    source={require(`${pathToAsset}icons/collapses.png`)}
                                    style={{height: 25, width: 25}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Edit Previous</Text>
                            </View>
                        );
                    },
                })}
            />
            <BottomTab.Screen
                name="PurchaseItemsScreen"
                component={PurchaseItemsScreen}
                options={({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: () => {
                        return;
                    },
                    tabBarIcon: ({ focused }) => {
                    if (focused)
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image_active}>
                                <Image
                                    source={require(`${pathToAsset}icons/purchase.png`)}
                                    style={{height: 25, width: 25}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Pre-purchased</Text>
                            </View>
                        );
                    else
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image}>
                                <Image
                                    source={require(`${pathToAsset}icons/purchase.png`)}
                                    style={{height: 25, width: 25}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Pre-purchased</Text>
                            </View>
                        );
                    },
                })}
            />
            <BottomTab.Screen
                name="PartnersScreen"
                component={PartnersScreen}
                options={({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: () => {
                        return;
                    },
                    tabBarIcon: ({ focused }) => {
                    if (focused)
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image_active}>
                                <Image
                                    source={require(`${pathToAsset}icons/partners.png`)}
                                    style={{height: 25, width: 25}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Partners</Text>
                            </View>
                        );
                    else
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image}>
                                <Image
                                    source={require(`${pathToAsset}icons/partners.png`)}
                                    style={{height: 25, width: 25}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>Partners</Text>
                            </View>
                        );
                    },
                })}
            />
            <BottomTab.Screen
                name="ContactScreen"
                component={ContactScreen}
                options={({route}) => ({
                    tabBarVisible: getTabBarVisibility(route),
                    tabBarLabel: () => {
                        return;
                    },
                    tabBarIcon: ({ focused }) => {
                    if (focused)
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image_active}>
                                <Image
                                    source={require(`${pathToAsset}icons/about.png`)}
                                    style={{height: 25, width: 25}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>About Us</Text>
                            </View>
                        );
                    else
                        return (
                            <View style={styles.main_navigation}>
                                <View style={styles.main_navigation_image}>
                                <Image
                                    source={require(`${pathToAsset}icons/about.png`)}
                                    style={{height: 25, width: 25}}
                                />
                                </View>
                                <Text style={styles.main_navigation_text}>About Us</Text>
                            </View>
                        );
                    },
                })}
            />
        </BottomTab.Navigator> 
    )
}

const styles = StyleSheet.create({
    bar_wrapper:{
        position:'absolute',
        overflow: 'hidden',
        height: 100,
        borderColor: 'transparent',
        backgroundColor: 'white',
    },
    tab_text:{
        marginBottom: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: '#000'
    },
    icon_wrapper:{
        marginTop: 10,
        height: 80,
        width: '67%'
    },
    main_navigation: {
        alignItems: 'center',
    },
    main_navigation_image: {
        width: 40,
        height: 40,
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#8b8f8c',
        justifyContent: "center",
        marginBottom: 5,
    },
    main_navigation_image_active: {
        width: 40,
        height: 40,
        alignItems: 'center',
        borderRadius: 50,
        // backgroundColor: '#6949FD',
        backgroundColor: '#5be49b',
        justifyContent: "center",
        marginBottom: 5,
    },
    main_navigation_text: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});