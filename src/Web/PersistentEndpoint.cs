using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace MonoWeb {
	public class PersistentEndpoint : PersistentConnection {
		protected override Task OnConnected(IRequest request, string connectionId)
		{
			return Connection.Broadcast("Connection " + connectionId + " connected");
		}

		protected override Task OnReceived(IRequest request, string connectionId, string data) 
		{
			return Connection.Broadcast("Connection " + connectionId+ " sent " + data);   
		}
	}
}

