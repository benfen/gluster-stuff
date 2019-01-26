# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "fedora/27-cloud-base"
  config.vm.box_version = "20171105"

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
            "gluster" => ["g0", "g1", "g2"]
	  }
	  ansible.limit = "all"
        end
      end
    end
  end

end
