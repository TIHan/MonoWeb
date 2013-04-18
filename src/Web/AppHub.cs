using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace MonoWeb {
    public class AppHub : Hub {
		public void Heartbeat() {
			Clients.Caller.log("Heartbeat Ack");
		}
    }
}

