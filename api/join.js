const join_channel = async (token, channelId) => {
    const { Client, GatewayIntentBits } = require('discord.js');
    const { createAudioPlayer, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');

    // Boşta kalmayı önlemek için 1 saniyelik sessiz bir ses dosyası
    const keepAliveAudio = 'audio/ambiences.mp3';

    async function joinAndPlay(channel) {
        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });
        const player = createAudioPlayer();
        const resource = createAudioResource(keepAliveAudio);
        
        player.play(resource); // Sessiz ses dosyasını çalarak bağlantıyı aktif tut
        connection.subscribe(player);
        console.log('Bot ses kanalında!');
    }
    
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
            joinAndPlay(channel);
            return { message: `Bot ${channel.name} adlı ses kanalına katıldı!` };
        } else {
            return { error: 'Geçersiz kanal ID\'si veya kanal ses kanalı değil.' };
        }
    } catch (error) {
        console.error('Bot hata verdi:', error);
        return { error: 'Bot ses kanalına katılamadı.' };
    }
};

module.exports = join_channel;
