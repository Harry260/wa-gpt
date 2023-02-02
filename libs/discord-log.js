import "dotenv/config";

function discordLog(title, description, error = false, extra = "") {
  if (process.env.DISCORD_WEBHOOK) {
    var color = 8453888;
    if (error === true) {
      color = 16711680;
      description = "```" + description + "```";
    }

    var params = {
      content: null,
      embeds: [
        {
          title,
          description,
          color,
          author: {
            name: extra,
          },
        },
      ],
    };
    fetch(
      "https://discord.com/api/webhooks/1070720026258190506/8GHXg0FY-BwzrVHVDcBN5409jMQP_sGw6MjE8xLMtfYLn-h1Q3ZOHZcG0azvU2qP4Ios",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(params),
      }
    ).then((res) => {
      console.log("Discord Log Sent");
    });
  }
}

export default discordLog;
