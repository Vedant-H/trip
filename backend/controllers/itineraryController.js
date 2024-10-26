// // backend/controllers/itineraryController.js

// // Mock AI Service (this should be replaced with real AI logic)
// const generateAIItinerary = (destination, budget, duration, activities) => {
//     return `
//       Day 1: Arrival at ${destination}. Settle in your hotel and enjoy local sightseeing.
//       Day 2: Explore the top attractions of ${destination}, including ${activities || "landmarks"}.
//       Day 3: Enjoy a guided tour of popular areas.
//       Budget: ${budget ? `${budget} USD` : "Budget information not provided"}.
//       Duration: ${duration || "Not specified"} days of fun!
//     `;
//   };
  
//   // Generate Itinerary Controller
//   export const generateItinerary = (req, res) => {
//     try {
//       const { destination, budget, duration, activities } = req.body;
  
//       if (!destination) {
//         return res.status(400).json({ message: "Destination is required" });
//       }
  
//       // Generate the itinerary using AI logic
//       const itinerary = generateAIItinerary(destination, budget, duration, activities);
  
//       // Send the itinerary back to the client
//       return res.status(200).json({
//         success: true,
//         itinerary,
//       });
//     } catch (error) {
//       console.error("Error generating itinerary:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//       });
//     }
//   };
  


// // import axios from 'axios';

// // // Generate Itinerary Controller
// // export const generateItinerary = async (req, res) => {
// //   try {
// //     const { destination, budget, duration, activities } = req.body;

// //     if (!destination) {
// //       return res.status(400).json({ message: "Destination is required" });
// //     }

// //     // Prepare prompt for AI model
// //     const prompt = `
// //       Generate a detailed travel itinerary for a trip to ${destination}. 
// //       Consider the following:
// //       Budget: ${budget ? budget + ' USD' : 'Not specified'}
// //       Duration: ${duration ? duration + ' days' : 'Not specified'}
// //       Activities: ${activities ? activities : 'General sightseeing'}
// //     `;

// //     // Call OpenAI API
// //     const response = await axios.post(
// //       'https://api.openai.com/v1/chat/completions',
// //       {
// //         model: 'gpt-3.5-turbo', // You can use 'gpt-4' if you have access
// //         messages: [{ role: 'user', content: prompt }],
// //         max_tokens: 300, // Adjust token count as needed
// //       },
// //       {
// //         headers: {
// //           'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
// //           'Content-Type': 'application/json',
// //         },
// //       }
// //     );

// //     // Extract itinerary from the response
// //     const itinerary = response.data.choices[0].message.content;

// //     // Send the itinerary back to the client
// //     return res.status(200).json({
// //       success: true,
// //       itinerary,
// //     });
// //   } catch (error) {
// //     console.error("Error generating itinerary:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal Server Error",
// //     });
// //   }
// // };

// // import axios from "axios";

// // export const generateItinerary = async (req, res) => {
// //     try {
// //         const { destination, budget, duration, activities } = req.body;

// //         if (!destination) {
// //             return res.status(400).json({ message: "Destination is required" });
// //         }

// //         const response = await axios.post(
// //             "https://api.openai.com/v1/chat/completions",
// //             {
// //                 model: "gpt-3.5-turbo",
// //                 messages: [
// //                     {
// //                         role: "user",
// //                         content: `Create a travel itinerary for ${destination} with a budget of ${budget} and a duration of ${duration} days. Include the following activities: ${activities}.`
// //                     }
// //                 ],
// //             },
// //             {
// //                 headers: {
// //                     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Your API Key
// //                     "Content-Type": "application/json",
// //                 },
// //             }
// //         );

// //         const itinerary = response.data.choices[0].message.content;

// //         // Send the itinerary back to the client
// //         return res.status(200).json({
// //             success: true,
// //             itinerary,
// //         });
// //     } catch (error) {
// //         console.error("Error generating itinerary:", error);
// //         return res.status(500).json({
// //             success: false,
// //             message: "Internal Server Error",
// //         });
// //     }
// // };
