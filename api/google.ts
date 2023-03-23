import axios from "axios";
import { z } from "zod";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

const url = "https://oauth2.googleapis.com/token";

export const getIdToken = async (code: string): Promise<string | null> => {
  const Response = z.object({
    id_token: z.string(),
    access_token: z.string(),
    refresh_token: z.string(),
    expires_in: z.number(),
    scope: z.string(),
    token_type: z.literal("Bearer"),
  });

  type Response = z.infer<typeof Response>;

  try {
    const response = await axios.post(url, {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: "authorization_code",
    });
    const result = Response.safeParse(response.data);
    console.log(result);
    if (result.success === false) {
      console.log(result.error);
      return null;
    }
    return result.data.id_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

