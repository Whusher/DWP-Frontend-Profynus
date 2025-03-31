import {api} from "../APIBase"; // Asegúrate de que este es tu axios con interceptores

export const registerDownload = async ({ userId, songName, artist, album, size, downloadURL }) => {
  try {
    const response = await api.post("/profynus-music/download/register", {
      userId,
      songName,
      artist,
      album,
      size,
      downloadURL,
    }, {
        withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error("Error al registrar la descarga:", error);
    throw error;
  }
};

export const getUserDownloads = async () => {
  try {
    const response = await api.get(`/profynus-music/downloads/`,{
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener historial de descargas:", error);
    throw error;
  }
};
export const sendBehavioralMetrics = async (MetricData) => {
  try {
    const response = await api.post(`/profynus-metrics/`,{
      songName: MetricData.songName, // Nombre de la canción desde Firebase
      songUrl: MetricData.songUrl, // URL de descarga desde Firebase
      action: MetricData.action,
      currentTime: MetricData.currentTime,
      sessionTime: MetricData.sessionTime,
      totalListeningTime: MetricData.totalListeningTime,
      progress: MetricData.progress
    },{
        withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener historial de descargas:", error);
    throw error;
  }
};
