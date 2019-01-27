# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "roboxes/fedora28"

  boxes = [
	  { :name => "g0", :ip => "192.168.1.2" },
	  { :name => "g1", :ip => "192.168.1.3" },
	  { :name => "g2", :ip => "192.168.1.4" }
  ]

  boxes.each do |box|
    config.vm.define box[:name] do |node|
      node.vm.hostname =  box[:name]
      node.vm.network :private_network, ip: box[:ip]

      if box[:name] == "g2"
	node.vm.provision "ansible" do |ansible|
	  ansible.playbook = "playbook.yml"
	  ansible.groups = {
            "gluster" => boxes.map{ |box| box[:name] }
	  }
	  ansible.extra_vars = {
	    "ansible_python_interpreter" => "/usr/bin/python3",
            "cluster_ips" => boxes.map{ |box| box[:ip] },
            "gluster_brick" => "/data/brick",
	    "gluster_volume" => "test_vol"
	  }
	  ansible.limit = "all"
	  ansible.compatibility_mode = "2.0"
        end
      end
    end
  end

end
