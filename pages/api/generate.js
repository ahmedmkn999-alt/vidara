export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  const { prompt } = req.body;
  const token = "R8_Kv4EUNsp6xIkUtcP3xCGjbIVF36pOxx3fq803";

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: { Authorization: `Token ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        version: "9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
        input: { prompt, num_frames: 24, fps: 8 }
      }),
    });
    const prediction = await response.json();
    res.status(201).json(prediction);
  } catch (error) { res.status(500).json({ message: error.message }); }
}
