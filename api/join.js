const join_channel = async (token, channelId) => {
    const { Client, GatewayIntentBits } = require('discord.js');
    const { joinVoiceChannel } = require('@discordjs/voice');
    
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates, // Sesli kanalları izlemek için gerekli intent
        ]
    });
    
    if (!token || !channelId) {
        return { error: 'Token ve Kanal ID\'si gereklidir' };
    }

    try {
        // Botu token ile giriş yapalım
        await client.login(token);

        // Ses kanalını bulalım
        const channel = await client.channels.fetch(channelId);
        if (channel && channel.isVoiceBased()) {
            // Ses kanalına katılalım
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator,
                selfDeaf: false, // Botun kendini susturup susturmayacağı
            });
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
