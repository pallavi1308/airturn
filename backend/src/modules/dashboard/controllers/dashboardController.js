const dashboardService = require(
    "../services/dashboardService"
  );
  
  const getDashboard = async (req, res) => {
    try {
      const metrics =
        await dashboardService.getDashboardMetrics();
  
      res.status(200).json({
        success: true,
        data: metrics,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  module.exports = {
    getDashboard,
  };