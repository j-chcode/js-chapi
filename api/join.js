const join_channel = async (token, channelId) => {
    const { Client, GatewayIntentBits } = require('discord.js');

    if (!token || !channelId) {
        return { error: 'Token ve Kanal ID\'si gereklidir' };
    }

    try {
        // Botu token ile giriş yapalım
        await client.login(token);

        // Ses kanalını bulup katılalım
        const channel = await client.channels.fetch(channelId);
        if (channel && channel.isVoiceBased()) {
            await channel.join(); // Ses kanalına katılma
            return { message: 'Bot ses kanalına katıldı!' };
        } else {
            return { error: 'Geçersiz kanal ID\'si veya kanal ses kanalı değil.' };
        }
    } catch (error) {
        console.error('Bot hata verdi:', error);
        return { error: 'Bot ses kanalına katılamadı.' };
    }
};

module.exports = join_channel;
