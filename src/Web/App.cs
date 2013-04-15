using System;
using System.Web.UI;
using System.Web.Routing;
using Microsoft.AspNet.SignalR;
using ServiceStack.CacheAccess;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.WebHost.Endpoints;

[assembly: WebActivator.PreApplicationStartMethod(typeof(MonoWeb.AppHost), "Start")]

namespace MonoWeb {
	public class AppHost : AppHostBase {		
		public AppHost() : base("App", typeof(AppService).Assembly) { }
		
		public override void Configure(Funq.Container container) {
			ServiceStack.Text.JsConfig.EmitCamelCaseNames = true;
		
			
			//Enable Authentication
			//ConfigureAuth(container);
			
			//Register all your dependencies
			//container.Register(new TodoRepository());			
		}
		
		/* Uncomment to enable ServiceStack Authentication and CustomUserSession
		private void ConfigureAuth(Funq.Container container)
		{
			var appSettings = new AppSettings();

			//Default route: /auth/{provider}
			Plugins.Add(new AuthFeature(() => new CustomUserSession(),
				new IAuthProvider[] {
					new CredentialsAuthProvider(appSettings), 
					new FacebookAuthProvider(appSettings), 
					new TwitterAuthProvider(appSettings), 
					new BasicAuthProvider(appSettings), 
				})); 

			//Default route: /register
			Plugins.Add(new RegistrationFeature()); 

			//Requires ConnectionString configured in Web.Config
			var connectionString = ConfigurationManager.ConnectionStrings["AppDb"].ConnectionString;
			container.Register<IDbConnectionFactory>(c =>
				new OrmLiteConnectionFactory(connectionString, SqlServerDialect.Provider));

			container.Register<IUserAuthRepository>(c =>
				new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()));

			var authRepo = (OrmLiteAuthRepository)container.Resolve<IUserAuthRepository>();
			authRepo.CreateMissingTables();
		}
		*/
		
		public static void Start() {
			new AppHost().Init();
			RouteTable.Routes.MapConnection<PersistentEndpoint>("echo", "/echo");
		}
	}

	//A customizeable typed UserSession that can be extended with your own properties
	public class CustomUserSession : AuthUserSession
	{
		public string CustomProperty { get; set; }
	}
	
	public class PageBase : Page
	{
		/// <summary>
		/// Typed UserSession
		/// </summary>
		private object userSession;
		protected virtual TUserSession SessionAs<TUserSession>()
		{
			return (TUserSession)(userSession ?? (userSession = Cache.SessionAs<TUserSession>()));
		}
		
		protected CustomUserSession UserSession
		{
			get
			{
				return SessionAs<CustomUserSession>();
			}
		}
		
		public new ICacheClient Cache
		{
			get { return AppHostBase.Resolve<ICacheClient>(); }
		}
		
		private ISessionFactory sessionFactory;
		public virtual ISessionFactory SessionFactory
		{
			get { return sessionFactory ?? (sessionFactory = AppHostBase.Resolve<ISessionFactory>()) ?? new SessionFactory(Cache); }
		}
		
		/// <summary>
		/// Dynamic Session Bag
		/// </summary>
		private ISession session;
		public new ISession Session
		{
			get
			{
				return session ?? (session = SessionFactory.GetOrCreateSession());
			}
		}
		
		public void ClearSession()
		{
			userSession = null;
			this.Cache.Remove(SessionFeature.GetSessionKey());
		}
	}
}

