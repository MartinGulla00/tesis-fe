const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">No autorizado</h1>
      <p className="text-lg mb-8">No tienes permiso para ver esta página.</p>
    </div>
  );
};

export default NotAuthorized;
