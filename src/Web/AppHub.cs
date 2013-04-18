using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace MonoWeb {
    public class AppHub : Hub {
		public override Task OnConnected() {
			return base.OnConnected();
		}

		public void Heartbeat() {
			Clients.Caller.logMessage("Heartbeat Ack");
		}
    }
}

