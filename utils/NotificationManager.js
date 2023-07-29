import * as Notifications from 'expo-notifications';

export async function requestNotificationPermissionsAsync() {
    const { status } = await Notifications.requestPermissionsAsync({
        ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
        },
    });
    if (status === 'granted') {
        return true;
    }
    return false;
}

export async function addBadgeCount() {
    const badgeCount = await Notifications.getBadgeCountAsync();
    await Notifications.setBadgeCountAsync(badgeCount + 1);
}

export async function clearBadgeCount() {
    await Notifications.setBadgeCountAsync(0);
}