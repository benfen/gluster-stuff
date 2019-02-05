# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "roboxes/fedora28"

  # Setup the vms.  Three file servers and one client to rule them all.
  machines = [
    { :name => "g0", :ip => "192.168.1.2" },
    { :name => "g1", :ip => "192.168.1.3" },
    { :name => "g2", :ip => "192.168.1.4" },
    { :name => "ghost", :ip => "192.168.1.5" }
  ]

  boxes = machines.slice(0, 3) 

  machines.each do |box|
    config.vm.define box[:name] do |node|
      node.vm.hostname =  box[:name]
      node.vm.network :private_network, ip: box[:ip]

      # Expose the client's port on the host
      if box[:name] == "ghost"
        config.vm.network "forwarded_port", guest: 80, host: 80
      end

      # Run Ansible provisioning.  Since Ansible can target all hosts, only do this once
      # Since the boxes are in an order, this guarantees this only runs after all boxes are running
      if box[:name] == "ghost"

        # Ansible is being used for provisioning, so it should be safe to run always
        node.vm.provision "ansible", run: "always" do |ansible|
          ansible.playbook = "playbook.yml"

          ansible.groups = {
            "client" => machines[-1][:name],
            "gluster" => boxes.map{ |box| box[:name] }
          }

          ansible.extra_vars = {
            "ansible_python_interpreter" => "/usr/bin/python3",
            "cluster_ips" => boxes.map{ |box| box[:ip] },
            "machine_ips" => machines.map{ |machine| machine[:ip] },
            "gluster_brick" => "/data/brick",
            "gluster_volume" => "test_vol",
            "gluster_client_mount" => "/mnt/glusterfs"
          }

          ansible.limit = "all"
          ansible.compatibility_mode = "2.0"
        end
      end
    end
  end

end
