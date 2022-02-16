const { TOKEN, CLIENT_ID, GUILD_ID } = require("./config/config.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
  new SlashCommandBuilder()
    .setName("clear100")
    .setDescription("Usuwa 100 wiadomości na kanale.")
    .setDefaultPermission(false),
  new SlashCommandBuilder()
    .setName("info")
    .setDescription("Zwraca informajce o bocie.!"),
].map((command) => command.toJSON());

const rest = new REST({ version: "9" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`Zalogowano jako ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "clear100") {
    await interaction.channel.bulkDelete(100);
  }

  if (commandName === "info") {
    const embed = new MessageEmbed()
      .setTitle("Snorlaks Bot")
      .setColor(0x00a2ff)
      .setDescription("Oryginalny bot Snorlaks, nie żaden podrabianiec.")
      .setFooter({ text: "Bot w fazie testów" })
      .addField("Autor", "patrol", true)
      .addField("Wersja", "1.0", true);

    await interaction.reply({ embeds: [embed], ephemeral: true });
    interaction.delete;
  }
});

client.on("messageCreate", (msg) => {
  // console.log(msg.content);
  // if (msg.content === "!clear") {
  //   msg.channel.bulkDelete(100);
  // }
});

client.login(TOKEN);
